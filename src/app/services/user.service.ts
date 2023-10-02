import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/enviroment';

import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uidUser(): string {
    return this.user?.uid || '';
  }

  newUser( formData: RegisterForm ) {
    return this.http.post(`${base_url}/users`, formData )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  login( formData: any ) { // Tuve problemas con el tipo LoginForm
    return this.http.post(`${base_url}/login`, formData )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  loginGoogle( token: string) {
    return this.http.post(`${base_url}/login/google`, { token } )
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  renewToken():Observable<boolean> {
    const headers = { 'x-token': this.token };

    return this.http.post(`${base_url}/login/renew`, {}, { headers })
      .pipe(
        map((resp: any) => {
          const { email, google, name, role, img, uid } = resp.user;
          this.user = new User( name, email, '', google, img, role, uid )
          localStorage.setItem('token', resp.token);
          return true
        }),
        catchError( error => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');

    if ( this.user?.google ) {
      google.accounts.id.revoke(this.user.email, () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
      });
    }
    this.router.navigateByUrl('/login');
  }

  putProfile( user: User ) {
    const headers = { 'x-token': this.token };

    return this.http.put(`${base_url}/users/${this.uidUser}`, user, { headers } )
  }

  loadUser( desde: number = 0) {
    const headers = { 'x-token': this.token };

    return this.http.get<{ total: number, users: User[]}>
      (`${base_url}/users?desde=${desde}`, { headers } )
      .pipe(
        map( resp => {
          const users = resp.users.map(
            user => new User( user.name, user.email, '', user.google, user.img, user.role, user.uid ) )

          return { total: resp.total, users}
        })
      )

  }

  deleteUser( uuid: string) {
    const headers = { 'x-token': this.token };

    return this.http.delete(`${base_url}/users/${uuid }`, { headers } )

  }

  putUser( user: User ) {
    const headers = { 'x-token': this.token };

    return this.http.put(`${base_url}/users/${user.uid}`, user, { headers } )
  }


}

