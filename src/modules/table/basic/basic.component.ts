/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;
import { TableSchemas } from '../shared/types/basic/table.schemas' ;

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
    {{ this.schemas | json }}
  ` ,
})
export class TableBasicComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas : TableSchemas = null ;

}
