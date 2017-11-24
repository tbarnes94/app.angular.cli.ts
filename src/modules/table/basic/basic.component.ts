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
  selector : 'table-basic' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './basic.component.styl' ] ,
  template :
  `
    TableBasicComponent
  ` ,
})
export class TableBasicComponent extends CommonComponent {}
