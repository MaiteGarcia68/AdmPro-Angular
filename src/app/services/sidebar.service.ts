import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Principal', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Grafica', url: 'grafica1' },
      ]
    },
    {
      title: 'Otro Menu',
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Principal', url: '/' },
        { title: 'Grafica', url: 'grafica1' },
      ]
    },
  ];

  constructor() { }
}
