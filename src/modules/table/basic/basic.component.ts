/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import * as firstBy from 'thenby' ;
import { BehaviorSubject } from 'rxjs/Rx' ;
import { Observable } from 'rxjs/Rx' ;

import { CommonComponent } from '../../commons' ;
import { TablePage } from '../shared/types/functions/table.pages' ;
import { TablePages } from '../shared/types/functions/table.pages' ;
import { TablePageSchemas } from '../shared/types/functions/table.pages' ;
import { TableSort } from '../shared/types/functions/table.sorts' ;
import { TableControl } from '../shared/types/basic/table.schemas' ;
import { TableSchemas } from '../shared/types/basic/table.schemas' ;
import { TableHead } from '../shared/types/cell/table.head' ;
import { TableRow } from '../shared/types/row/table.row' ;

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
    <ng-container
      *ngIf='( this.bodys$ | async ) as bodys'
      >
      <!-- table -->
      <table
        *ngIf='( bodys.length > 0 )'
        class='table-basic'
        >
        <!-- thead -->
        <thead>
          <tr
            *ngIf='( this.heads$ | async ) as heads'
            [key]='heads.key'
            [children]='heads.children'
            (onSortsEvent)='this.onSorts( $event )'
            [type]='"head"'
            table-row
            >
          </tr>
        </thead>
        <!-- tbody -->
        <tbody>
          <ng-container
            *ngFor='let one of bodys ; index as i ;'
            >
            <!-- route -->
            <tr
              *ngIf='( one.route )'
              [key]='one.key'
              [children]='one.children'
              [sequence]='( i % 2 === 0 ) ? "even" : "odd"'
              [routerLink]='one.route'
              [type]='"body-click"'
              table-row
              >
            </tr>
            <!-- non-route -->
            <tr
              *ngIf='( !one.route )'
              [key]='one.key'
              [children]='one.children'
              [sequence]='( i % 2 === 0 ) ? "even" : "odd"'
              [type]='"body"'
              table-row
              >
            </tr>
          </ng-container>
        </tbody>
      </table>
      <!-- pages -->
      <ng-container
        *ngIf='( bodys.length > 0 )'
        >
        <div
          *ngIf='( this.pages$ | async ) as pages'
          [key]='"pages"'
          [schemas]='pages.schemas'
          [children]='pages.pages'
          (onPagesEvent)='this.onPages( $event )'
          table-pages
          >
        </div>
      </ng-container>
      <!-- empty -->
      <div
        *ngIf='( bodys.length <= 0 )'
        >
        <ng-content
          select='.table-empty'
          >
        </ng-content>
      </div>
    </ng-container>
  ` ,
})
export class TableBasicComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas : TableSchemas = null ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly headz$ : BehaviorSubject<TableRow<TableHead>> = new BehaviorSubject<TableRow<TableHead>>( null ) ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly bodyz$ : BehaviorSubject<Array<TableRow<TableControl>>> = new BehaviorSubject<Array<TableRow<TableControl>>>([]) ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly sortz$ : BehaviorSubject<Array<TableSort>> = new BehaviorSubject<Array<TableSort>>([]) ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly pagez$ : BehaviorSubject<TablePageSchemas> = new BehaviorSubject<TablePageSchemas>( null ) ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly heads$ : Observable<TableRow<TableControl>> = Observable.combineLatest
    (
      this.headz$ , // raw
      this.sortz$ , // raw
    )
    .map( ( o ) => ({ datas : o[ 0 ] , sorts : o[ 1 ] }))
    .filter( ( o ) => ( !!o.datas ) )
    .map( ( o ) => this.toHeads( o.datas , o.sorts ) )
    .takeUntil( this.destroy$ )
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly sorts$ : Observable<Array<TableRow<TableControl>>> = Observable.combineLatest
    (
      this.bodyz$ , // raw
      this.sortz$ , // raw
    )
    .map( ( o ) => ({ datas : o[ 0 ] , sorts : o[ 1 ] }))
    .map( ( o ) => this.toSorts( o.datas , o.sorts ) )
    .takeUntil( this.destroy$ )
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly bodys$ : Observable<Array<TableRow<TableControl>>> = Observable.combineLatest
    (
      this.sorts$ , // sorts
      this.pagez$ , // raw
    )
    .map( ( o ) => ({ datas : o[ 0 ] , pages : o[ 1 ] }))
    .filter( ( o ) => ( !!o.datas ) )
    .map( ( o ) => this.toBodys( o.datas , o.pages ) )
    .takeUntil( this.destroy$ )
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly pages$ : Observable<TablePages> = Observable.combineLatest
    (
      this.sorts$ , // sorts
      this.pagez$ , // raw
    )
    .map( ( o ) => ({ datas : o[ 0 ] , pages : o[ 1 ] }))
    .filter( ( o ) => ( !!o.datas ) )
    .map( ( o ) => this.toPages( o.datas , o.pages ) )
    .takeUntil( this.destroy$ )
    ;

  /**
   * @param datas
   * @param schemas
   * @returns datas
   */
  public toHeads( datas : TableRow<TableHead> , schemas : Array<TableSort> ) : TableRow<TableHead>
  {
    datas.children.map( ( o ) =>
    {
      const found : TableSort = schemas.filter( ( i ) => i.key === o.key )[ 0 ] ;
      o.order = ( found ) ? found.order : null ;
      return o ;
    }) ;

    return datas ;

  }

  /**
   * @param datas
   * @param schemas
   * @returns datas
   */
  public toSorts( datas : Array<TableRow<TableControl>> , schemas : Array<TableSort> ) : Array<TableRow<TableControl>>
  {
    const sorters : any = schemas.reduce
    (
      ( t : any , c , i ) =>
      {
        return ( i === 0 )
          ? firstBy( ( o ) => o.raw[ c.key ] , ( c.order === 'a' ) ? 1 : -1 )
          : t.thenBy( ( o ) => o.raw[ c.key ] , ( c.order === 'a' ) ? 1 : -1 )
          ;
      } ,
      null
    ) ;

    return ( sorters )
      ? datas.slice(0).sort( sorters )
      : datas
      ;

  }

  /**
   * @param datas
   * @param schemas
   * @returns datas
   */
  public toBodys( datas : Array<TableRow<TableControl>> , schemas : TablePageSchemas ) : Array<TableRow<TableControl>>
  {
    const limit : number = schemas.size ;
    const current : number = schemas.current - 1 ; // to array index
    const last : number = datas.length - 1 ; // to array index

    let start : number = ( current * limit ) ;
    start = ( start > 0 && start <= last ) ? start : 0 ;
    const end : number = ( start + limit ) ;

    return datas.slice( start , end ) ;

  }

  /**
   * @param datas
   * @param schemas
   * @returns datas
   */
  public toPages( datas : Array<TableRow<TableControl>> , schemas : TablePageSchemas ) : TablePages
  {
    const limit : number = schemas.size ;
    const total : number = Math.ceil( datas.length / limit ) ;
    const pages : Array<TablePage> = new Array() ;

    let current : number = schemas.current ;
    current = ( current > 0 && current <= total ) ? current : 1 ;

    for ( let i = 1 ; i <= total ; i++ ) {
      pages.push( new TablePage( i , ( i === current ) , ( i === 1 ) , ( i === total ) ) ) ;
    }

    return new TablePages( schemas , pages ) ;

  }

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onSorts( input : TableSort ) : void
  {
    const payload : Array<TableSort> = ( input.order )
      ? [ input ]
      : []
      ;

    this.sortz$.next( payload ) ;

  }

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onPages( input : number ) : void
  {
    const limit : number = this.schemas.pages.size ;
    this.pagez$.next( new TablePageSchemas( limit , input ) ) ;
  }

  /**
   * https://angular.io/api/core/OnChanges
   * https://angular.io/api/core/OnChanges#ngOnChanges
   */
  public ngOnChanges() : void
  {
    this.headz$.next( this.schemas.heads ) ;
    this.bodyz$.next( this.schemas.bodys ) ;
  }

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit() : void
  {
    this.sortz$.next( this.schemas.sorts ) ;
    this.pagez$.next( this.schemas.pages ) ;
  }

}
