/** @imports */
import { CurrencyPipe } from '@angular/common' ;
import { DatePipe } from '@angular/common' ;
import { Injectable } from '@angular/core' ;
import { Observable } from 'rxjs/Rx' ;

import { isNotEmpty } from '../../../commons' ;
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
    width$ : Observable<number> ,
    datas$ : Observable<Array<any>> = Observable.of([]) ,
    options$ : Observable<any> = Observable.of({}) ,
    parse : ( o : any ) => any ,
  )
  : Observable<TableSchemas>
  {
    return Observable
      .combineLatest( language$ , translations$ , width$ , datas$ , options$ )
      .map( ( o ) => ({ language : o[0] , translations : o[1] , width : o[2] , datas : o[3] , options : o[4] }) )
      .filter( ( o ) => ( isNotEmpty( o.language ) && isNotEmpty( o.translations ) && !!o.datas && !!o.options ) )
      .map( ( o : any ) =>
      {
        const date : DatePipe = new DatePipe( o.language ) ;
        const currency : CurrencyPipe = new CurrencyPipe( o.language ) ;
        o.date = { transform : ( i ) => date.transform( i ) } ;
        o.currency = { transform : ( i ) => currency.transform( i , 'CAD' , 'symbol-narrow' ) } ;
        return o ;
      })
      .map( parse )
      ;
  }

}
