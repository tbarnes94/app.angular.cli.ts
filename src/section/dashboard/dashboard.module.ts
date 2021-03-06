import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@kuwas/angular';

import { TemplateModule } from '../../modules/template';
import { DashboardRouteModule } from './dashboard-route.module';
import { DashboardFormsComponent } from './forms/forms.component';
import { DashboardTableComponent } from './table/table.component';

/**
 * https://angular.io/api/core/NgModule
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
    TemplateModule,
    DashboardRouteModule,
  ],
  declarations: [
    DashboardFormsComponent,
    DashboardTableComponent,
  ],
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
