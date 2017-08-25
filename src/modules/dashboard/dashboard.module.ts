import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

import { CommonModule } from '../commons';
import { DashboardRouteModule } from './dashboard-route.module';
import { DashboardDashboardComponent } from './dashboard/dashboard.component';

/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
@NgModule({
  imports: [],
})
export class DashboardRootModule {
}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule({
  imports: [
    CommonModule,
    DashboardRouteModule,
  ],
  declarations: [ DashboardDashboardComponent ],
  exports: [],
})
export class DashboardModule {

  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DashboardRootModule,
      providers: [],
    };
  }

}
