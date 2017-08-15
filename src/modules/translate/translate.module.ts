import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule as TranslateModuleDep } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TranslateService } from './shared/service/translate.service';
import { translateReducers } from './shared/store/translate.reducers';

/**
 * https://github.com/ngx-translate/http-loader
 */
export function TranslateLoaderFactory(http: Http): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18ns/', '.json');
}

/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
@NgModule({
  imports: [
    HttpModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature('translate', translateReducers),
    TranslateModuleDep.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [ Http ],
      }
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
