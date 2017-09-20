import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule as StoreModuleExternal } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { metaReducers } from './store/reducers';
import { reducers } from './store/reducers';

/**
 * https://github.com/ngrx/platform
 */
@NgModule({
  imports: [
    EffectsModule.forRoot([]),
    StoreModuleExternal.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 100 }),
    // x StoreRouterConnectingModule ,
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class StoreModule {}
