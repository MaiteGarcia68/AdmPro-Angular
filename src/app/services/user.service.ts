import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/enviroment';

import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
  ) { }

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
    const token = localStorage.getItem('token') || '';
    const headers = {
      'x-token': token
    };

    return this.http.post(`${base_url}/login/renew`, {}, { headers })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map(resp => true),
        catchError( error => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('ma.teresa.garcia.arraztoa@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

    // gloogle.accounts.id.revoke( 'mt.garcia.arr@gmail.com', () => {})

  }

}

