import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { AuthLoginComponent } from './login/login.component';

/**
 * https://angular.io/api/router/Routes
 */
const route: Routes = [
  { path: '',      redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthLoginComponent },
  { path: '**',    redirectTo: 'login' },
];

/**
 * https://angular.io/guide/router#milestone-2-routing-module
 */
@NgModule
({
  imports: [ RouterModule.forChild(route) ],
  exports: [],
})
export class AuthRouteModule {
}
