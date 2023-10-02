import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private http: HttpClient ) { }

  uploadImg(
      file: File,
      table: 'users'|'doctors'|'hospitals',
      id: string,
  ) {

    const url = `${ base_url }/upload/${ table }/${ id }`;
    const formData = new FormData();
    formData.append( 'img', file );
    return this.http.put( url, formData, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    })
  }

}
