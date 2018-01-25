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
    '[class.table-cell-right]' : '( this.align === "r" )' ,
    '[class.table-cell-left]' : '( this.align === "l" )' ,
    '[class.table-cell-empty]' : '( !this.value )' ,
    '[class.table-cell-icon]' : '( !!this.icon )' ,
    '[style.width]' : 'this.width + "%"' ,

    '[attr.aria-sort]' : '( !!this.order ) ? ( this.order === "d" ) ? "descending" : "ascending" : null' ,
    '[attr.role]' : '( this.type !== "head" ) ? ( this.first ) ? "rowheader" : "gridcell" : "columnheader"' ,
    '[attr.scope]' : '( this.type === "head" ) ? "col" : null' ,

  } ,
  template :
  `
    <!-- th -->
    <button *ngIf=
      '(
        this.value &&
        this.type === "head"
      )'
      (click)='this.onSorts( this.key , this.order )'
      >
      <span>
        {{ this.value }}
      </span>
      <span class='ico' >
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
      </span>
    </button>
    <!-- td -->
    <div
      *ngIf='( this.type === "body" )'
      >
      <!-- template -->
      <ng-container
        *ngIf='( this.click ) ; then clickenable else clickdisable ;'
        >
      </ng-container>
      <!-- clickenable -->
      <ng-template #clickenable >
        <a
          [routerLink]=''
          (click)='this.onClick( this.click , this.schemas )'
          >
          <ng-container *ngTemplateOutlet='content' ></ng-container>
        </a>
      </ng-template>
      <!-- clickdisable -->
      <ng-template #clickdisable >
        <ng-container *ngTemplateOutlet='content' ></ng-container>
      </ng-template>
      <!-- content -->
      <ng-template #content >
        <span>
          {{ ( this.value ) ? this.value : '&nbsp;' }}
        </span>
        <ng-container
          *ngIf='( this.icon )'
          >
          <ng-container
            *ngIf='( this.icon === "chevron-right" ) ; then contentbutton else contenticon ;'
            >
          </ng-container>
        </ng-container>
      </ng-template>
      <!-- contentbutton -->
      <ng-template #contentbutton >
        <button
          class='ico'
          [attr.aria-label]='this.translations.click'
          >
          <ng-container *ngTemplateOutlet='icons' ></ng-container>
        </button>
      </ng-template>
      <!-- contenticon -->
      <ng-template #contenticon >
        <span class='ico' >
          <ng-container *ngTemplateOutlet='icons' ></ng-container>
        </span>
      </ng-template>
      <!-- icons -->
      <ng-template #icons >
        <i 
          class='fa fa-{{ this.icon }}'
          aria-hidden='true'
          >
        </i>
      </ng-template>
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
  @Input() public readonly schemas : TableControl = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly translations : any = {} ;

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
  @Input() public readonly click : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly icon : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly type : string = 'body' ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onClickEvent : EventEmitter<TableClick> = new EventEmitter() ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onSortsEvent : EventEmitter<TableSort> = new EventEmitter() ;

  /**
   * https://angular.io/guide/user-input
   * @param key
   * @param datas
   */
  public onClick( key : string , datas : TableControl ) : void
  {
    this.onClickEvent.next( new TableClick( key , datas ) ) ;
  }

  /**
   * https://angular.io/guide/user-input
   * @param key
   * @param order
   */
  public onSorts( key : string , order : string ) : void
  {
    this.onSortsEvent.next( new TableSort
    (
      key ,
      ( order )
        ? ( order === 'a' ) ? 'd' : null
        : 'a'
        ,
    )) ;
  }

}
