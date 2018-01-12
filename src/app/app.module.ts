import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter' ;
import { ApiModule } from '@kuwas/angular';
import { CommonModule } from '@kuwas/angular';
import { StreamModule } from '@kuwas/angular';
import { TranslateLocales } from '@kuwas/angular';
import { TranslateModule } from '@kuwas/angular';

import { CoreModule } from './core/core.module';
import { AppRouteModule } from './root/app-route.module';
import { AppRootComponent } from './root/root.component';
import { StoreModule } from './shared/store.module';

import { Translations } from '../assets/i18ns';
import { environment } from '../environments/environment';
import { FormModule } from '../modules/forms';
import { TableModule } from '../modules/table';
import { TemplateModule } from '../modules/template';

import { AuthModule } from '../section/auth';
import { DashboardModule } from '../section/dashboard';

TranslateLocales();

/**
 * https://angular.io/guide/styleguide#app-root-module
 */
@NgModule({

  imports: [

    /** node_modules */
    MatMomentDateModule,

    /** application */
    AppRouteModule,
    CoreModule,
    StoreModule,

    /** modules */
    ApiModule.forRoot(
      environment.api,
    ),
    CommonModule.forRoot(),
    FormModule.forRoot(),
    StreamModule.forRoot(),
    TableModule.forRoot(),
    TemplateModule.forRoot(),
    TranslateModule.forRoot(
      environment.translate,
      Translations,
    ),
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
