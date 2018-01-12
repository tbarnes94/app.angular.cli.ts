/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import { CommonComponent } from '@kuwas/angular' ;

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
    '[class.table-row]' : 'true' ,
    '[class.table-row-head]' : '( this.type === "head" )' ,
    '[class.table-row-body]' : '( this.type === "body" )' ,
    '[class.table-row-click]' : '( this.type === "body-click" )' ,
    '[class.table-row-even]' : '( this.sequence === "e" )' ,
    '[class.table-row-odd]' : '( this.sequence === "o" )' ,

    '[attr.tabindex]' : '( this.type === "body-click" ) ? "0" : null' ,
    '[attr.aria-label]' : '( this.type === "body-click" ) ? this.label : null' ,
    '[attr.role]' : '"row"' ,

  } ,
  template :
  `
    <!-- row -->
    <ng-container
      *ngFor='let one of this.children ; index as index ; first as first ; last as last ;'
      >
      <ng-container *ngIf='one.shown' >
        <!-- th -->
        <th
          *ngIf='( this.type === "head" )'
          [key]='one.key'
          [value]='one.value'
          [align]='one.align'
          [width]='one.width'
          [order]='one.order'
          [type]='this.type'
          (onSortsEvent)='this.onSorts( $event )'
          [index]='index'
          [first]='first'
          [last]='last'
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
          [key]='one.key'
          [value]='one.value'
          [align]='one.align'
          [type]='this.type'
          [index]='index'
          [first]='first'
          [last]='last'
          table-cell
          >
        </td>
      </ng-container>
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
  @Input() public readonly label : string = null ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onSortsEvent : EventEmitter<TableSort> = new EventEmitter() ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly children : Array<TableControl> = new Array() ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly type : string = 'body' ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly sequence : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly index : number = 0 ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly first : boolean = false ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly last : boolean = false ;


  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onSorts( input : TableSort ) : void
  {
    this.onSortsEvent.next( input ) ;
  }

}
