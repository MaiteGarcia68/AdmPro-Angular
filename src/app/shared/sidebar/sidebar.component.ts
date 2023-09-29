import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[] = [];

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService,
  ) {
    this.menuItems = this.sidebarService.menu;
  }

  logout() {
    this.userService.logout();
  }

}
