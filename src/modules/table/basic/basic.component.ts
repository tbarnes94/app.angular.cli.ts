/** @imports */
import { Component } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import * as firstBy from 'thenby' ;
import { BehaviorSubject } from 'rxjs/Rx' ;
import { Observable } from 'rxjs/Rx' ;

import { CommonComponent } from '../../commons' ;
import { TableSort } from '../shared/types/basic/table.functions' ;
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
            *ngFor='let row of bodys ; index as i ;'
            >
            <!-- route -->
            <tr
              *ngIf='( row.route )'
              [key]='row.key'
              [children]='row.children'
              [sequence]='( i % 2 === 0 ) ? "even" : "odd"'
              [routerLink]='row.route'
              [type]='"body-click"'
              table-row
              >
            </tr>
            <!-- non-route -->
            <tr
              *ngIf='( !row.route )'
              [key]='row.key'
              [children]='row.children'
              [sequence]='( i % 2 === 0 ) ? "even" : "odd"'
              [type]='"body"'
              table-row
              >
            </tr>
          </ng-container>
        </tbody>
        <!-- tfoot -->
        <tfoot>
          <!-- pagination -->
        </tfoot>
      </table>
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
  public readonly sorts$ : BehaviorSubject<Array<TableSort>> = new BehaviorSubject<Array<TableSort>>([]) ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly headz$ : BehaviorSubject<TableRow<TableHead>> = new BehaviorSubject<TableRow<TableHead>>( null ) ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly bodyz$ : BehaviorSubject<Array<TableRow<TableControl>>> = new BehaviorSubject<Array<TableRow<TableControl>>>([]) ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly heads$ : Observable<TableRow<TableControl>> = Observable.combineLatest
    (
      this.headz$ ,
      this.sorts$ ,
    )
    .map( ( o ) => ({ datas : o[ 0 ] , sorts : o[ 1 ] }))
    .filter( ( o ) => ( !!o.datas ) )
    .map( ( o ) => this.toHeads( o.datas , o.sorts ) )
    .takeUntil( this.destroy$ )
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly bodys$ : Observable<Array<TableRow<TableControl>>> = Observable.combineLatest
    (
      this.bodyz$ ,
      this.sorts$ ,
    )
    .map( ( o ) => ({ datas : o[ 0 ] , sorts : o[ 1 ] }))
    .map( ( o ) => this.toSorts( o.datas , o.sorts ) )
    .takeUntil( this.destroy$ )
    ;

  /**
   *
   */
  public toHeads( datas : TableRow<TableHead> , sorts : Array<TableSort> ) : TableRow<TableHead>
  {
    datas.children.map( ( o ) =>
    {
      const found : TableSort = sorts.filter( ( i ) => i.key === o.key )[ 0 ] ;
      o.order = ( found ) ? found.order : null ;
      return o ;
    }) ;

    return datas ;

  }

  /**
   * @param datas
   * @param sorts
   * @returns datas
   */
  public toSorts( datas : Array<TableRow<TableControl>> , sorts : Array<TableSort> ) : Array<TableRow<TableControl>>
  {
    const sorters : any = sorts.reduce
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
   * https://angular.io/guide/user-input
   * @param input
   */
  public onSorts( input : TableSort ) : void
  {
    const payload : Array<TableSort> = ( input.order )
      ? [ input ]
      : []
      ;

    this.sorts$.next( payload ) ;

  }

  /**
   * https://angular.io/api/core/OnChanges
   * https://angular.io/api/core/OnChanges#ngOnChanges
   */
  public ngOnChanges() : void
  {
    this.headz$.next( this.schemas.columns ) ;
    this.bodyz$.next( this.schemas.rows ) ;
  }

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit() : void
  {
    this.sorts$.next( this.schemas.sorts ) ;
  }

}
