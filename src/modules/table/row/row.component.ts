/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;
import { TableControl } from '../shared/types/basic/table.schemas' ;
import { TableSort } from '../shared/types/functions/table.sorts' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : '[table-row]' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './row.component.styl' ] ,
  host :
  {
    '[class.table-row-head]' : '( this.type === "head" )' ,
    '[class.table-row-click]' : '( this.type === "body-click" )' ,
    '[class.table-row-even]' : '( this.sequence === "even" )' ,
    '[class.table-row-odd]' : '( this.sequence === "odd" )' ,
  } ,
  template :
  `
    <ng-container
      *ngFor='let cell of this.children'
      >
      <!-- th -->
      <th
        *ngIf='( this.type === "head" )'
        [key]='cell.key'
        [value]='cell.value'
        [align]='cell.align'
        [width]='cell.width'
        [order]='cell.order'
        (onSortsEvent)='this.onSorts( $event )'
        [type]='"head"'
        table-cell
        >
      </th>
      <!-- td -->
      <td
        *ngIf=
        '(
          this.type === "body" ||
          this.type === "body-click"
        )'
        [key]='cell.key'
        [value]='cell.value'
        [align]='cell.align'
        [type]='"body"'
        table-cell
        >
      </td>
    </ng-container>
  ` ,
})
export class TableRowComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly key : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly children : Array<TableControl> = new Array() ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly sequence : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly type : string = 'body' ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onSortsEvent : EventEmitter<TableSort> = new EventEmitter() ;

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onSorts( input : TableSort ) : void
  {
    this.onSortsEvent.next( input ) ;
  }

}
