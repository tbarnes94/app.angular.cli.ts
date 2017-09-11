import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

import { CommonModule } from '../commons';
import { TemplateBasicComponent } from './basic/basic.component';

/**
 * https://angular.io/api/core/NgModule
 */
@NgModule({
  imports: [],
})
export class TemplateRootModule {
}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TemplateBasicComponent,
  ],
  exports: [
    TemplateBasicComponent,
  ],
})
export class TemplateModule {

  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TemplateRootModule,
      providers: [],
    };
  }

}
