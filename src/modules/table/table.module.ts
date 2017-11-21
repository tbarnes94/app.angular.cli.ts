/** @imports */
import { CommonModule } from '@angular/common' ;
import { ModuleWithProviders } from '@angular/core' ;
import { NgModule } from '@angular/core' ;

import { CommonModule as CommonModuleExternal } from '../commons' ;
import { TableService } from './shared/service/table.service' ;

/**
 * https://angular.io/api/core/NgModule
 */
@NgModule
({
  imports : [] ,
})
export class TableRootModule {}

/**
 * https://angular.io/guide/styleguide#feature-modules
 */
@NgModule
({
  imports :
  [
    CommonModule ,
    CommonModuleExternal ,
  ] ,
  declarations : [] ,
  exports : [] ,
})
export class TableModule
{
  /**
   * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   */
  public static forRoot() : ModuleWithProviders
  {
    return {
      ngModule : TableRootModule ,
      providers :
      [
        TableService ,
      ] ,
    } ;
  }

}
