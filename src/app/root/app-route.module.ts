import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { AuthGuard } from '../../modules/auth';
import { CommonPreloadStrategy } from '../../modules/commons';

/**
 * https://angular.io/api/router/Routes
 */
const route: Routes = [
  { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth',      loadChildren: '../../modules/auth/auth.module#AuthModule' },
  { path: 'dashboard', loadChildren: '../../modules/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  { path: '**',        redirectTo: 'dashboard' },
];

/**
 * https://angular.io/guide/router#milestone-2-routing-module
 */
@NgModule({
  imports: [ RouterModule.forRoot(route, { preloadingStrategy: CommonPreloadStrategy }) ],
  exports: [],
})
export class AppRouteModule {
}
