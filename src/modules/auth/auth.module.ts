import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CommonModule } from '../commons';
import { AuthRouteModule } from './auth-route.module';
import { AuthLoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthService } from './shared/service/auth.service';
import { AuthEffects } from './shared/store/auth.effects';
import { authReducers } from './shared/store/auth.reducers';

/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
@NgModule({
  imports: [
    EffectsModule.forFeature([ AuthEffects ]),
    StoreModule.forFeature('auth', authReducers),
  ],
})
export class AuthRootModule {
}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule({
  imports: [
    CommonModule,
    AuthRouteModule,
  ],
  declarations: [ AuthLoginComponent ],
  exports: [],
})
export class AuthModule {

  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthRootModule,
      providers: [
        AuthGuard,
        AuthService,
      ],
    };
  }

}
