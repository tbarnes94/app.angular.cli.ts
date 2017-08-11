import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './root/app.component';
import { AppRouteModule } from './root/app-route.module';
import { StoreModule } from './shared/store.module';

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
