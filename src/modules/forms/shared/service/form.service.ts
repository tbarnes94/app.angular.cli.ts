/** @imports */
import { CurrencyPipe } from '@angular/common' ;
import { DatePipe } from '@angular/common' ;
import { Injectable } from '@angular/core' ;
import { Observable } from 'rxjs/Rx' ;

import { isNotEmpty } from '../../../commons' ;
import { FormSchemas } from '../types/form/form.schemas' ;

/**
 * https://angular.io/api/core/Injectable
 */
@Injectable()
export class FormService
{
  /**
   * http://reactivex.io/documentation/observable.html
   */
  public build$
  (
    language$ : Observable<string> ,
    translations$ : Observable<any> ,
    loads$ : Observable<boolean> ,
    options$ : Observable<any> = Observable.of({}) ,
    parse : ( o : any ) => any ,
  )
  : Observable<FormSchemas>
  {
    return Observable
      .combineLatest( language$ , translations$ , loads$ , options$ )
      .map( ( o ) => ({ language : o[0] , translations : o[1] , loads : o[2] , options : o[3] }) )
      .filter( ( o ) => ( isNotEmpty( o.language ) && isNotEmpty( o.translations ) && !!o.options ) )
      .map( ( o : any ) =>
      {
        const date : DatePipe = new DatePipe( o.language ) ;
        const currency : CurrencyPipe = new CurrencyPipe( o.language ) ;
        o.date = { transform : ( i ) => date.transform( i ) } ;
        o.currency = { transform : ( i ) => currency.transform( i , 'CAD' , true ) } ;
        return o ;
      })
      .map( parse )
      ;
  }

}
