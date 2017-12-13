import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { AuthGuard } from '../auth';
import { DashboardFormsComponent } from './forms/forms.component';
import { DashboardTableComponent } from './table/table.component';

/**
 * https://angular.io/api/router/Routes
 */
const route: Routes = [
  { path: '',       redirectTo: 'forms',                pathMatch: 'full'          },
  { path: 'forms',  component: DashboardFormsComponent, /*canActivate: [ AuthGuard ]*/ },
  { path: 'table',  component: DashboardTableComponent, /*canActivate: [ AuthGuard ]*/ },
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
