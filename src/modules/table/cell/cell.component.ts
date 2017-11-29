/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;
import { TableControl } from '../shared/types/basic/table.schemas' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : '[table-cell]' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './cell.component.styl' ] ,
  host :
  {
    '[style.width]' : 'this.width + "%"' ,
  } ,
  template :
  `
    <!-- th -->
    <div
      *ngIf='( this.type === "head" )'
      >
      {{ this.schemas.value }}
    </div>
    <!-- td -->
    <div
      *ngIf='( this.type === "body" )'
      >
      {{ this.schemas.value }}
    </div>
  ` ,
})
export class TableCellComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas : TableControl = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly width : number = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly type : string = 'body' ;

}
