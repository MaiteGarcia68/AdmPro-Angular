import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user: User | undefined;

  constructor (
    private userService: UserService,
  ) {
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }

}
