/** @imports */
import { CurrencyPipe } from '@angular/common' ;
import { DatePipe } from '@angular/common' ;
import { Injectable } from '@angular/core' ;
import { Observable } from 'rxjs/Rx' ;

import { ApiResponse } from '../../../api' ;
import { CommonService } from '../../../commons' ;
import { isNotEmpty } from '../../../commons' ;
import { toContent } from '../../../commons' ;

/**
 * https://angular.io/api/core/Injectable
 */
@Injectable()
export class TableService
{
  /**
   * http://reactivex.io/documentation/observable.html
   */
  public build$(
    nodes : Array<string> ,
    parse : ( o : any ) => any ,
    filters : ( o : any ) => boolean = ( o : any ) => true ,
  )
  : Observable<any>
  {
    return Observable.combineLatest
      (
        this.common.select<ApiResponse<any>>( nodes )
          .map( toContent )
          ,
        this.common.select<string>([ 'translate' , 'language' ]) ,
        this.common.select<any>([ 'translate' , 'translations' ]) ,
        this.common.width$ ,
      )
      .map( ( o ) => ({ items : o[0] , language : o[1] , translations : o[2] , width : o[3] }) )
      .filter( ( o ) => ( isNotEmpty( o.items ) && isNotEmpty( o.language ) && isNotEmpty( o.translations ) ) )
      .filter( filters )
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

  /**
   * Constructor
   * @param common    https://angular.io/tutorial/toh-pt4
   */
  public constructor(
    protected readonly common : CommonService ,
  ) {}

}
