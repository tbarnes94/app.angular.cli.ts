import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CommonModule as CommonModuleDep } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsBootstrapUIModule } from '@ng2-dynamic-forms/ui-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { CommonComponent } from './common/common.component';
import { CommonGuard } from './shared/guard/common.guard';
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
  ],
  exports: [
    CommonModuleDep,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsBootstrapUIModule,
    TranslateModule,
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
