/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;
import { TableSort } from '../shared/types/functions/table.sorts' ;

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
    '[class.table-cell]' : 'true' ,
    '[class.table-cell-head]' : '( this.type === "head" )' ,
    '[class.table-cell-body]' : '( this.type === "body" )' ,
    '[class.table-cell-click]' : '( this.type === "body-click" )' ,
    '[class.table-cell-right]' : '( this.align === "r" )' ,
    '[class.table-cell-left]' : '( this.align === "l" )' ,
    '[style.width]' : 'this.width + "%"' ,

    '[attr.aria-sort]' : '( !!this.order ) ? ( this.order === "d" ) ? "descending" : "ascending" : null' ,
    '[attr.role]' : '( this.type !== "head" ) ? ( this.first ) ? "rowheader" : "gridcell" : "columnheader"' ,
    '[attr.scope]' : '( this.type === "head" ) ? "col" : null' ,

  } ,
  template :
  `
    <!-- th -->
    <button
      *ngIf='( this.type === "head" )'
      (click)='this.onSorts( this.key , this.order )'
      >
      <span>
        {{ this.value }}
      </span>
      <i
        [ngClass]=
        '{
          "fa-sort" : ( !this.order ) ,
          "fa-sort-down" : ( this.order === "d" ) ,
          "fa-sort-up" : ( this.order === "a" )
        }'
        aria-hidden='true'
        class='fa'
        >
      </i>
    </button>
    <!-- td -->
    <div *ngIf=
      '(
        this.type === "body" ||
        this.type === "body-click"
      )'
      >
      <span>
        {{ this.value }}
      </span>
      <i *ngIf=
        '(
          this.last &&
          this.type === "body-click"
        )'
        class='fa fa-chevron-right'
        aria-hidden='true'
        >
      </i>
    </div>
  ` ,
})
export class TableCellComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly key : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly value : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly align : string = 'l' ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly width : number = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly order : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly type : string = 'body' ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onSortsEvent : EventEmitter<TableSort> = new EventEmitter() ;

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
   * @param key
   * @param order
   */
  public onSorts( key : string , order : string ) : void
  {
    this.onSortsEvent.next
    ({
      key : key ,
      order : ( order )
        ? ( order === 'a' ) ? 'd' : null
        : 'a'
        ,
    }) ;
  }

}
