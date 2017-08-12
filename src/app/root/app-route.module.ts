import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { AuthGuard } from '../../modules/auth';
import { CommonPreloadStrategy } from '../../modules/commons';

/**
 * https://angular.io/guide/router#milestone-6-asynchronous-routing
 */
const route: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', loadChildren: '../../modules/auth/auth.module#AuthModule' },
  { path: 'dashboard', loadChildren: '../../modules/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

/**
 * https://angular.io/guide/router#milestone-2-routing-module
 */
@NgModule({
  imports: [ RouterModule.forRoot(route, { preloadingStrategy: CommonPreloadStrategy }) ],
  exports: [ RouterModule ],
})
export class AppRouteModule {
}
