import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {


  // Para indicar que la propiedad es privada se inicial con _nombreVariable
  private _ocultarModal: boolean = true;
  public table: 'users'|'hospitals'|'doctors' = 'users';
  public uid: string | undefined;
  public img: string | undefined;

  public newImg: EventEmitter<string> = new EventEmitter();

  constructor() { }

  get ocultarModal() {
    return this._ocultarModal
  }

  openModal(
      table: 'users'|'hospitals'|'doctors',
      uid: string,
      img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.table = table;
    this.uid = uid;

    if ( img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${table}/${img}`
    }
  }

  closeModal() {
    this._ocultarModal = true;
  }

}
