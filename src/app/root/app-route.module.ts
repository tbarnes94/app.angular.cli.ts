import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonPreloadStrategy } from '@kuwas/angular';

/**
 * https://angular.io/api/router/Routes
 */
const route: Routes = [
  { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth',      loadChildren: '../../section/auth/auth.module#AuthModule',                 data: { key: 'auth' } },
  { path: 'dashboard', loadChildren: '../../section/dashboard/dashboard.module#DashboardModule',  data: { key: 'dashboard' } },
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
