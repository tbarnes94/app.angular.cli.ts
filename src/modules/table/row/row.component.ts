/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import { CommonComponent } from '@kuwas/angular' ;

import { TableControl } from '../shared/types/basic/table.schemas' ;
import { TableClick } from '../shared/types/functions/table.click' ;
import { TableSort } from '../shared/types/functions/table.sorts' ;
import { TableRow } from '../shared/types/row/table.row' ;

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
    '[attr.aria-label]' : '( this.type === "body-click" ) ? this.translations.click : null' ,
    '[attr.role]' : '"row"' ,

  } ,
  template :
  `
    <!-- row -->
    <ng-container
      *ngFor='let one of this.children ;'
      >
      <ng-container *ngIf='one.shown' >
        <!-- th -->
        <th
          *ngIf='( this.type === "head" )'
          [key]='one.key'
          [schemas]='one'
          [translations]='this.translations'
          (onSortsEvent)='this.onSorts( $event )'
          [value]='one.value'
          [align]='one.align'
          [width]='one.width'
          [order]='one.order'
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
          [key]='one.key'
          [schemas]='one'
          [translations]='this.translations'
          (onClickEvent)='this.onClick( $event )'
          [value]='one.value'
          [align]='one.align'
          [click]='one.click'
          [icon]='one.icon'
          [type]='"body"'
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
  @Input() public readonly schemas : TableRow<TableControl> = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly translations : any = {} ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onClickEvent : EventEmitter<TableClick> = new EventEmitter() ;

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
   * https://angular.io/guide/user-input
   * @param input
   */
  public onClick( input : TableClick ) : void
  {
    this.onClickEvent.next( input ) ;
  }

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onSorts( input : TableSort ) : void
  {
    this.onSortsEvent.next( input ) ;
  }

}
