import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { authGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './mantenimientos/user/user.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ authGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      // Perfil Usuario
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Cuenta Usuario'} },
      // Main
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica '} },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de Usuario'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress'} },
      { path: 'promesa', component: PromesaComponent, data: { title: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'} },
      // Mantenimientos
      { path: 'users', component: UserComponent, data: { title: 'Usuarios de aplicación'} },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule {

}
