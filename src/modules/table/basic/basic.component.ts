/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import { CommonContainerComponent } from '@kuwas/angular' ;
import { replace } from '@kuwas/angular' ;
import * as firstBy from 'thenby' ;
import { BehaviorSubject } from 'rxjs/Rx' ;
import { Observable } from 'rxjs/Rx' ;

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
    <!-- table -->
    <ng-container
      *ngIf='( this.bodys$ | async ) as bodys'
      >
      <table
        *ngIf='( bodys.length > 0 )'
        class='table-basic'
        [attr.aria-labelledby]='this.schemas.key + "-caption"'
        aria-readonly='true'
        role='grid'
        >
        <!-- caption -->
        <caption
          *ngIf='( this.caption$ | async ) as caption'
          [id]='this.schemas.key + "-caption"'
          aria-live='polite'
          aria-atomic='true'
          >
          {{ caption }}
        </caption>
        <!-- thead -->
        <thead>
          <tr
            *ngIf='( this.heads$ | async ) as heads'
            [key]='heads.key'
            (onSortsEvent)='this.onSorts( $event )'
            [children]='heads.children'
            [type]='"head"'
            table-row
            >
          </tr>
        </thead>
        <!-- tbody -->
        <tbody>
          <ng-container
            *ngFor='let one of bodys ; even as even ; index as index ; first as first ; last as last ;'
            >
            <!-- route -->
            <tr
              *ngIf='( one.route )'
              [key]='one.key'
              [label]='this.schemas.translations.click'
              (click)='this.onClick( $event , one.route )'
              (keypress)='this.onClick( $event , one.route )'
              [children]='one.children'
              [type]='"body-click"'
              [sequence]='( even ) ? "e" : "o"'
              [index]='index'
              [first]='first'
              [last]='last'
              table-row
              >
            </tr>
            <!-- non-route -->
            <tr
              *ngIf='( !one.route )'
              [key]='one.key'
              [children]='one.children'
              [type]='"body"'
              [sequence]='( even ) ? "e" : "o"'
              [index]='index'
              [first]='first'
              [last]='last'
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
        <nav
          *ngIf='( this.pages$ | async ) as pages'
          [key]='"pages"'
          [translations]='this.schemas.translations.pages'
          [schemas]='pages.schemas'
          (onPagesEvent)='this.onPages( $event )'
          [children]='pages.pages'
          table-pages
          >
        </nav>
      </ng-container>
      <!-- empty -->
      <div
        *ngIf='( bodys.length <= 0 )'
        class='table-empty'
        >
        <ng-content
          select='.table-empty'
          >
        </ng-content>
      </div>
    </ng-container>
  ` ,
})
export class TableBasicComponent extends CommonContainerComponent
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
   * http://reactivex.io/documentation/observable.html
   */
  public readonly caption$ : Observable<string> = Observable.combineLatest
    (
      this.heads$ ,
      this.pages$ ,
    )
    .map( ( o ) => ({ heads : o[ 0 ] , pages : o[ 1 ] }))
    .map( ( o ) => this.toCaption.call( this , this.schemas.translations , o.heads , o.pages ) )
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
   * @param translations
   * @param heads
   * @param pages
   * @returns string
   */
  public toCaption( translations : any , heads : TableRow<TableControl> , pages : TablePages ) : string
  {
    const t : any = translations ;
    const sorts : Array<string> = heads.children.reduce
      (
        ( total , c : any ) =>
        {
          if ( c.order === 'a' ) { total.push( replace( t.sorts.a , [ c.value ] ) ) ; }
          if ( c.order === 'd' ) { total.push( replace( t.sorts.d , [ c.value ] ) ) ; }
          return total ;
        } ,
        new Array() ,
      )
      ;

    return replace
    (
      t.caption.title ,
      [
        t.title ,
        ( sorts.length > 0 )
          ? replace( t.caption.sorts , [ sorts.join( t.caption.separator ) ] )
          : t.sorts.null
          ,
        ( pages.pages.length > 1 )
          ? replace( t.caption.pages , [ `${pages.schemas.current}` , `${pages.pages.length}` ] )
          : ''
          ,
      ] ,
    ) ;

  }

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onSorts( input : TableSort ) : void
  {
    const payload : Array<TableSort> = ( input.order ) ? [ input ] : [] ;
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
    this.common.totop() ;
  }

  /**
   * https://angular.io/guide/user-input
   * @param event
   * @param input
   */
  public onClick( event : any , input : Array<string> ) : void
  {
    if (
      ( !event.charCode ) ||
      ( event.charCode === 13 ) ||
      ( event.charCode === 32 )
    ) {
      this.common.redirect( input ) ;
    }
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
