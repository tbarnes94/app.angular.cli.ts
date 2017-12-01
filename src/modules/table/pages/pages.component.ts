/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;

import { CommonComponent } from '../../commons' ;
import { TablePage } from '../shared/types/functions/table.pages' ;
import { TablePageSchemas } from '../shared/types/functions/table.pages' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : '[table-pages]' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './pages.component.styl' ] ,
  template :
  `
    <!-- pages -->
    <ng-container
      *ngIf='( this.children.length > 1 )'
      >
      <ng-container
        *ngFor='let one of this.children'
        >
        <!-- prev -->
        <a
          *ngIf='( one.first )'
          [routerLink]=''
          [ngClass]='{ "table-pages-disable" : one.current }'
          (click)='this.onPages( one.current , this.schemas.current - 1 )'
          class='table-pages-prev'
          >
          <i
            class='fa fa-angle-left'
            aria-hidden='true'
            >
          </i>
        </a>
        <!-- numbers -->
        <a
          [routerLink]=''
          [ngClass]='{ "table-pages-current" : one.current }'
          (click)='this.onPages( one.current , one.key )'
          >
          <span>{{ one.key }}</span>
        </a>
        <!-- next -->
        <a
          *ngIf='( one.last )'
          [routerLink]=''
          [ngClass]='{ "table-pages-disable" : one.current }'
          (click)='this.onPages( one.current , this.schemas.current + 1 )'
          class='table-pages-next'
          >
          <i
            class='fa fa-angle-right'
            aria-hidden='true'
            >
          </i>
        </a>
      </ng-container>
    </ng-container>
  ` ,
})
export class TablePagesComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly key : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas : TablePageSchemas = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly children : Array<TablePage> = new Array() ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onPagesEvent : EventEmitter<number> = new EventEmitter() ;

  /**
   * https://angular.io/guide/user-input
   * @param current
   * @param key
   */
  public onPages( current : boolean , key : number ) : void
  {
    if ( !current ) { this.onPagesEvent.next( key ) ; }
  }

}
