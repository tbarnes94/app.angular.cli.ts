/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import { CommonComponent } from '@kuwas/angular' ;
import { replace } from '@kuwas/angular' ;

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
  host :
  {
    '[class.table-pages]' : 'true' ,

    '[attr.aria-label]' : 'this.translations.title' ,
    '[attr.role]' : '"navigation"' ,

  } ,
  template :
  `
    <!-- pages -->
    <ul
      *ngIf='( this.children.length > 1 )'
      >
      <ng-container
        *ngFor='let one of this.children'
        >
        <!-- prev -->
        <li *ngIf='( one.first )' >
          <button
            [attr.aria-hidden]='( one.current )'
            [attr.aria-label]='this.translations.p'
            [attr.tabindex]='( one.current ) ? -1 : 0'
            (click)='this.onPages( one.current , this.schemas.current - 1 )'
            [ngClass]='{ "table-pages-disable" : one.current }'
            class='table-pages-prev'
            >
            <i
              class='fa fa-angle-left'
              aria-hidden='true'
              >
            </i>
          </button>
        </li>
        <!-- numbers -->
        <li>
          <button
            [attr.aria-current]='( one.current )'
            [attr.aria-label]='this.replace( this.translations.o , [ one.key ] )'
            (click)='this.onPages( one.current , one.key )'
            [ngClass]='{ "table-pages-current" : one.current }'
            class='table-pages-one'
            >
            <span>{{ one.key }}</span>
          </button>
        </li>
        <!-- next -->
        <li *ngIf='( one.last )' >
          <button
            [attr.aria-hidden]='( one.current )'
            [attr.aria-label]='this.translations.n'
            [attr.tabindex]='( one.current ) ? -1 : 0'
            (click)='this.onPages( one.current , this.schemas.current + 1 )'
            [ngClass]='{ "table-pages-disable" : one.current }'
            class='table-pages-next'
            >
            <i
              class='fa fa-angle-right'
              aria-hidden='true'
              >
            </i>
          </button>
        </li>
      </ng-container>
    </ul>
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
  @Input() public readonly translations : any = {} ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas : TablePageSchemas = null ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onPagesEvent : EventEmitter<number> = new EventEmitter() ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly children : Array<TablePage> = new Array() ;

  /**
   * https://angular.io/guide/user-input
   * @param current
   * @param key
   */
  public onPages( current : boolean , key : number ) : void
  {
    this.onPagesEvent.next( key ) ;
  }

  /**
   * @param input
   * @param options
   * @returns string
   */
  public replace( input : string , options : Array<string> ) : string
  {
    return replace( input , options ) ;
  }

}
