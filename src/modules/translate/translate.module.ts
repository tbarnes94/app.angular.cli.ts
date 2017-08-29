import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule as TranslateModuleDep } from '@ngx-translate/core';

import { TranslateService } from './shared/service/translate.service';
import { translateReducers } from './shared/store/translate.reducers';
import { TranslateLoaderFactory } from './shared/translate/translate.loader.factory';
import { TranslateMissingHandler } from './shared/translate/translate.missing.handler';

/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
@NgModule({
  imports: [
    HttpModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature('translate', translateReducers),
    TranslateModuleDep.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: TranslateMissingHandler },
      loader: { provide: TranslateLoader, useFactory: TranslateLoaderFactory, deps: [ Http ] },
    }),
  ],
})
export class TranslateRootModule {
}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule({
  imports: [],
  exports: [ TranslateModuleDep ],
})
export class TranslateModule {

  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TranslateRootModule,
      providers: [ TranslateService ],
    };
  }

}
