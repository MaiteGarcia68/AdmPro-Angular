import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    let theme = localStorage.getItem( 'theme' ) || `./assets/css/colors/default-dark.css`
    this.linkTheme?.setAttribute('href',theme);

  }

  changeTheme( theme: string) {
    if (theme) {
      const url = `./assets/css/colors/${ theme }.css`
      this.linkTheme?.setAttribute('href',url);
      localStorage.setItem( 'theme', url )
    }
  }
}
