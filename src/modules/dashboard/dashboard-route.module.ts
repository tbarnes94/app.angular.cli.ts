import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

/**
 * https://angular.io/guide/router#configuration
 */
const route: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'}
];

/**
 * https://angular.io/guide/router#milestone-2-routing-module
 */
@NgModule
({
  imports: [ RouterModule.forChild(route) ],
  exports: [ RouterModule ],
})
export class DashboardRouteModule {
}
