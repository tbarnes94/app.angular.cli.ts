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
  selector : 'table-row' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './row.component.styl' ] ,
  template :
  `
    TableRowComponent
  ` ,
})
export class TableRowComponent extends CommonComponent {}
