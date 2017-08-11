import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule as StoreModuleDep } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { metaReducers } from './store/reducers';
import { reducers } from './store/reducers';

/**
 * https://github.com/ngrx/store
 */
@NgModule({
  imports: [
    EffectsModule.forRoot([]),
    StoreModuleDep.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 100 }),
    // x StoreRouterConnectingModule ,
  ],
  declarations: [],
  exports: [],
})
export class StoreModule {

  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot(): ModuleWithProviders {
    return { ngModule: StoreModule, providers: [] };
  }

}
