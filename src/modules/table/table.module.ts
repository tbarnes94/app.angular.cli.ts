/** @imports */
import { CommonModule } from '@angular/common' ;
import { ModuleWithProviders } from '@angular/core' ;
import { NgModule } from '@angular/core' ;
import { RouterModule } from '@angular/router' ;

import { CommonModule as CommonModuleExternal } from '../commons' ;
import { TableBasicComponent } from './basic/basic.component' ;
import { TableCellComponent } from './cell/cell.component' ;
import { TablePagesComponent } from './pages/pages.component' ;
import { TableRowComponent } from './row/row.component' ;
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
    RouterModule ,
  ] ,
  declarations :
  [
    TableBasicComponent ,
    TableCellComponent ,
    TablePagesComponent ,
    TableRowComponent ,
  ] ,
  exports :
  [
    TableBasicComponent ,
  ] ,
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
