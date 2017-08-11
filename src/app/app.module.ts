import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './root/app.component';
import { AppRouteModule } from './root/app-route.module';
import { StoreModule } from './shared/store.module';

import { ApiModule } from '../modules/api';
import { CommonModule } from '../modules/commons';
import { DashboardModule } from '../modules/dashboard';

/**
 * https://angular.io/guide/styleguide#app-root-module
 */
@NgModule({

  imports: [

    /** node_modules */

    /** application */
    AppRouteModule,
    CoreModule.forRoot(),
    StoreModule.forRoot(),

    /** modules */
    ApiModule.forRoot({}),
    CommonModule.forRoot(),
    DashboardModule.forRoot(),

  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
