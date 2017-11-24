/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'table-cell' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './cell.component.styl' ] ,
  template :
  `
    TableCellComponent
  ` ,
})
export class TableCellComponent extends CommonComponent {}
