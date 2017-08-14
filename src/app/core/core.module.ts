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
  providers: [],
  exports: [],
})
export class CoreModule {
}
