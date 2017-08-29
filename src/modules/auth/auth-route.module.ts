import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { AuthLoginComponent } from './login/login.component';

/**
 * https://angular.io/guide/router#milestone-6-asynchronous-routing
 */
const route: Routes = [
  { path: 'login', component: AuthLoginComponent }
];

/**
 * https://angular.io/guide/router#milestone-2-routing-module
 */
@NgModule
({
  imports: [ RouterModule.forChild(route) ],
  exports: [ RouterModule ],
})
export class AuthRouteModule {
}
