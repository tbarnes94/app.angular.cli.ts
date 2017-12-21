import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { FormModule } from '../forms';
import { TableModule } from '../table';
import { TranslateModule } from '../translate';
import { TemplateBasicComponent } from './basic/basic.component';
import { TemplateContainerComponent } from './container/container.component';
import { TemplateErrorComponent } from './error/error.component';
import { TemplateLoadsComponent } from './loads/loads.component';

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
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    RouterModule,

    FormModule,
    TableModule,
    TranslateModule,

  ],
  declarations: [
    TemplateBasicComponent,
    TemplateContainerComponent,
    TemplateErrorComponent,
    TemplateLoadsComponent,
  ],
  exports: [

    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    RouterModule,

    TemplateBasicComponent,
    TemplateContainerComponent,
    TemplateErrorComponent,
    TemplateLoadsComponent,

    FormModule,
    TableModule,
    TranslateModule,

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
