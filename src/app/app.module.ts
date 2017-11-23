import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material';

import { CoreModule } from './core/core.module';
import { AppRouteModule } from './root/app-route.module';
import { AppRootComponent } from './root/root.component';
import { StoreModule } from './shared/store.module';

import { environment } from '../environments/environment';

import { ApiModule } from '../modules/api';
import { CommonModule } from '../modules/commons';
import { FormModule } from '../modules/forms';
import { TableModule } from '../modules/table';
import { TemplateModule } from '../modules/template';
import { TranslateModule } from '../modules/translate';
import '../modules/translate/translate.locales';

import { AuthModule } from '../section/auth';
import { DashboardModule } from '../section/dashboard';

/**
 * https://angular.io/guide/styleguide#app-root-module
 */
@NgModule({

  imports: [

    /** node_modules */
    MatNativeDateModule,

    /** application */
    AppRouteModule,
    CoreModule,
    StoreModule,

    /** modules */
    ApiModule.forRoot(environment.api),
    CommonModule.forRoot(),
    FormModule.forRoot(),
    TableModule.forRoot(),
    TemplateModule.forRoot(),
    TranslateModule.forRoot(environment.translate),
    CommonModule,
    TemplateModule,

    /** section */
    AuthModule.forRoot(),
    DashboardModule.forRoot(),

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
