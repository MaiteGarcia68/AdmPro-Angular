import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');
  public links: NodeListOf<Element> | undefined;

  constructor(
    private settingService: SettingService
  ) {}

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector')
    this.changeCurrentTheme()
  }

  changeTheme( theme: string) {
    this.settingService.changeTheme(theme)
    this.changeCurrentTheme()
  }

  changeCurrentTheme() {
    if (this.links) {
      this.links.forEach( e => {
        e.classList.remove('working')
        const btnTheme = e.getAttribute('data-theme')
        const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`
        const currentTheme = this.linkTheme?.getAttribute('href')
        if ( currentTheme === btnThemeUrl ) {
          e.classList.add('working')
        }
      })
    }
  }

}
