import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CommonModule as CommonModuleDep } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';
import { MdProgressSpinnerModule } from '@angular/material';
import { DynamicFormsMaterialUIModule } from '@ng2-dynamic-forms/ui-material';
import { TranslateModule } from '@ngx-translate/core';

import { CommonComponent } from './common/common.component';
import { CommonGuard } from './shared/guard/common.guard';
import { CommonPipe } from './shared/pipes/common.pipe';
import { CommonPreloadStrategy } from './shared/router/common.preload.strategy';
import { CommonService } from './shared/service/common.service';
import { commonReducers } from './shared/store/common.reducers';

/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
@NgModule({
  imports: [
    EffectsModule.forFeature([]),
    StoreModule.forFeature('common', commonReducers),
  ],
})
export class CommonRootModule {
}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule({
  imports: [
    CommonModuleDep,
  ],
  declarations: [
    CommonComponent,
    CommonPipe,
  ],
  exports: [
    CommonModuleDep,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    DynamicFormsMaterialUIModule,
    TranslateModule,

    CommonComponent,
    CommonPipe,

  ],

})
export class CommonModule {

  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonRootModule,
      providers: [
        CommonGuard,
        CommonPreloadStrategy,
        CommonService,
      ],
    };
  }

}
