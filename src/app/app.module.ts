import { NgModule } from '@angular/core';
import { DynamicFormsCoreModule } from '@ng2-dynamic-forms/core';

import { CoreModule } from './core/core.module';
import { AppRouteModule } from './root/app-route.module';
import { AppRootComponent } from './root/root.component';
import { StoreModule } from './shared/store.module';

import { environment } from '../environments/environment';
import { ApiModule } from '../modules/api';
import { AuthModule } from '../modules/auth';
import { CommonModule } from '../modules/commons';
import { DashboardModule } from '../modules/dashboard';
import { TemplateModule } from '../modules/template';
import { TranslateModule } from '../modules/translate';

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
    TemplateModule.forRoot(),
    TranslateModule.forRoot(environment.translate),
    CommonModule,
    TemplateModule,

  ],
  declarations: [
    AppRootComponent,
  ],
  bootstrap: [
    AppRootComponent,
  ],
})
export class AppModule {
}
