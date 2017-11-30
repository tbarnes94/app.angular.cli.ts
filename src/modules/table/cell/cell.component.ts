/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;
import { TableSort } from '../shared/types/basic/table.functions' ;

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
    '[class.table-cell-head]' : '( this.type === "head" )' ,
    '[class.table-cell-left]' : '( this.align === "l" )' ,
    '[class.table-cell-right]' : '( this.align === "r" )' ,
    '[style.width]' : 'this.width + "%"' ,
  } ,
  template :
  `
    <!-- th -->
    <div
      *ngIf='( this.type === "head" )'
      (click)='this.onSorts( this.key , this.order )'
      >
      {{ this.value }}
      <i
        [ngClass]=
        '{
          "fa-sort-up" : ( this.order === "a" ) ,
          "fa-sort-down" : ( this.order === "d" ) ,
          "fa-sort" : ( !this.order )
        }'
        aria-hidden='true'
        class='fa'
        >
      </i>
    </div>
    <!-- td -->
    <div
      *ngIf='( this.type === "body" )'
      >
      {{ this.value }}
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
