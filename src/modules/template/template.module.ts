import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';
import { MdProgressSpinnerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { DynamicFormsMaterialUIModule } from '@ng2-dynamic-forms/ui-material';

import { TranslateModule } from '../translate';
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
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    RouterModule,
    DynamicFormsMaterialUIModule,

    TranslateModule,

  ],
  declarations: [
    TemplateBasicComponent,
  ],
  exports: [

    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    RouterModule,
    DynamicFormsMaterialUIModule,

    TemplateBasicComponent,
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
