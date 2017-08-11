import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * https://angular.io/guide/styleguide#core-feature-module
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [],
  exports: [],
})
export class CoreModule {

  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot(): ModuleWithProviders {
    return { ngModule: CoreModule, providers: [] };
  }

}
