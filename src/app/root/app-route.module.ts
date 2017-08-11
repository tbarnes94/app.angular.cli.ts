import { NgModule } from '@angular/core';
import { PreloadAllModules } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

/**
 * https://angular.io/guide/router#milestone-6-asynchronous-routing
 */
const route: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: '../../modules/dashboard#DashboardModule' },
  { path: '**', redirectTo: '' },
];

/**
 * https://angular.io/guide/router#milestone-2-routing-module
 */
@NgModule({
  imports: [ RouterModule.forRoot(route, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ],
})
export class AppRouteModule {
}
