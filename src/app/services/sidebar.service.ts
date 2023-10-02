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
        { title: 'Principal', url: './' },
        { title: 'ProgressBar', url: './progress' },
        { title: 'Grafica', url: './grafica1' },
        { title: 'Promesa', url: './promesa' },
        { title: 'Rxjs', url: './rxjs' },
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      subMenu: [
        { title: 'Usuarios', url: './users' },
        { title: 'Hospitales', url: './hospitals' },
        { title: 'Medicos', url: './doctors' },
      ]
    },
  ];

  constructor() { }
}
