/** @imports */
import { CurrencyPipe } from '@angular/common' ;
import { DatePipe } from '@angular/common' ;
import { Injectable } from '@angular/core' ;
import { isEmpty } from 'lodash-es' ;
import { Observable } from 'rxjs/Rx' ;

import { TableSchemas } from '../types/basic/table.schemas' ;

/**
 * https://angular.io/api/core/Injectable
 */
@Injectable()
export class TableService
{
  /**
   * http://reactivex.io/documentation/observable.html
   */
  public build$
  (
    language$ : Observable<string> ,
    translations$ : Observable<any> ,
    modules$ : Observable<any> ,
    width$ : Observable<number> ,
    datas$ : Observable<Array<any>> = Observable.of([]) ,
    options$ : Observable<any> = Observable.of({}) ,
    parse : any ,
  )
  : Observable<TableSchemas>
  {
    return Observable
      .combineLatest( language$ , translations$ , modules$ , width$ , datas$ , options$ )
      .map( ( o ) => ({ language : o[0] , translations : o[1], modules : o[2] , width : o[3] , datas : o[4] , options : o[5] }) )
      .filter( ( o ) => ( !isEmpty( o.language ) && !isEmpty( o.translations ) && !isEmpty( o.modules ) && !!o.datas && !!o.options ) )
      .map( ( o : any ) =>
      {
        const date : DatePipe = new DatePipe( o.language ) ;
        const currency : CurrencyPipe = new CurrencyPipe( o.language ) ;
        o.date = { transform : ( i , t = 'mediumDate' ) => date.transform( i , t ) } ;
        o.currency = { transform : ( i , t = 'CAD' ) => currency.transform( i , t , 'symbol-narrow' ) } ;
        return o ;
      })
      .map( parse )
      ;
  }

}
