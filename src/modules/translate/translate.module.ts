/** @imports */
import { NgModule } from '@angular/core' ;
import { ModuleWithProviders } from '@angular/core' ;
import { EffectsModule } from '@ngrx/effects' ;
import { StoreModule } from '@ngrx/store' ;

import { TranslateService } from './shared/service/translate.service' ;
import { TranslateReducers } from './shared/store/translate.reducers' ;
import { TranslateOptions } from './shared/types/translate.options' ;

/**
 * https://angular.io/api/core/NgModule
 */
@NgModule
({
  imports :
  [
    EffectsModule.forFeature([]) ,
    StoreModule.forFeature( 'translate' , TranslateReducers ) ,
  ] ,
})
export class TranslateRootModule {}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule
({
  imports : [] ,
  exports : [] ,
})
export class TranslateModule
{
  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot( options : TranslateOptions ) : ModuleWithProviders
  {
    return {
      ngModule : TranslateRootModule ,
      providers :
      [
        { provide : TranslateOptions , useValue : options } ,
        TranslateService ,
      ] ,
    } ;
  }

}
