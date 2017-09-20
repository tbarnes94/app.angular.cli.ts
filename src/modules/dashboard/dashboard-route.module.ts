import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { DashboardDashboardComponent } from './dashboard/dashboard.component';

/**
 * https://angular.io/api/router/Routes
 */
const route: Routes = [
  { path: '',   component: DashboardDashboardComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

/**
 * https://angular.io/guide/router#milestone-2-routing-module
 */
@NgModule
({
  imports: [ RouterModule.forChild(route) ],
  exports: [],
})
export class DashboardRouteModule {
}
