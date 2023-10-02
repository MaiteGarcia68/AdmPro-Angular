import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class BusquedaService {



  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  private transformUsers( users: any[]):User[] {
    return users.map(
      user => new User( user.name, user.email, '', user.google, user.img, user.role, user.uid )
    )
  }

  findTable( table: string, term: string = '') {
    const headers = { 'x-token': this.token };

    return this.http.get<{ ok:boolean, data: []}>
      (`${base_url}/todo/coleccion/${table}/${term}`, { headers } )
        .pipe(
          map( (rsp) =>  {
            switch (table) {
              case 'user':
                return this.transformUsers( rsp.data )

              default:
                return[];
            }
          })
        )
  }

}
