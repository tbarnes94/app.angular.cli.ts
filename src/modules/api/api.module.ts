/** @imports */
import { HttpClientModule } from '@angular/common/http' ;
import { NgModule } from '@angular/core' ;
import { ModuleWithProviders } from '@angular/core' ;

import { ApiService } from './shared/service/api.service' ;
import { ApiOptions } from './shared/types/api.options' ;

/**
 * https://angular.io/api/core/NgModule
 */
@NgModule
({
  imports : [ HttpClientModule ] ,
})
export class ApiRootModule {}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule
({
  imports : [] ,
  declarations : [] ,
  exports : [] ,
})
export class ApiModule
{
  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot( options : ApiOptions ) : ModuleWithProviders
  {
    return {
      ngModule : ApiRootModule ,
      providers :
      [
        { provide : ApiOptions , useValue : options } ,
        ApiService ,
      ] ,
    } ;
  }

}
