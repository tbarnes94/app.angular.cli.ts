import { NgModule } from '@angular/core';
import { DynamicFormsCoreModule } from '@ng2-dynamic-forms/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './root/app.component';
import { AppRouteModule } from './root/app-route.module';
import { StoreModule } from './shared/store.module';

import { environment } from '../environments/environment';
import { ApiModule } from '../modules/api';
import { AuthModule } from '../modules/auth';
import { CommonModule } from '../modules/commons';
import { DashboardModule } from '../modules/dashboard';

/**
 * https://angular.io/guide/styleguide#app-root-module
 */
@NgModule({

  imports: [

    /** node_modules */
    DynamicFormsCoreModule.forRoot(),

    /** application */
    AppRouteModule,
    CoreModule,
    StoreModule,

    /** modules */
    ApiModule.forRoot(environment.api),
    AuthModule.forRoot(),
    CommonModule.forRoot(),
    DashboardModule.forRoot(),
    CommonModule,

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
