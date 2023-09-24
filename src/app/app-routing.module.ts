import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { Page404Component } from './page404/page404.component';

const routes: Routes = [

  // path: '/dashborad' PageRouting
  // path: '/auth' AuthRouting

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: Page404Component },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes, { useHash: true } ),
    PageRoutingModule,
    AuthRoutingModule,
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
