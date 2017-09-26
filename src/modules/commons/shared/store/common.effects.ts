/** @imports */
import { Injectable } from '@angular/core' ;
import { Actions } from '@ngrx/effects' ;
import { Observable } from 'rxjs/Rx' ;

import { ApiService } from '../../../api/shared/service/api.service' ;
import { ApiError } from '../../../api/shared/types/api.error' ;
import { ApiResponse } from '../../../api/shared/types/api.response' ;
import { CommonService } from '../service/common.service' ;
import { CommonAction } from './common.action' ;

/**
 * https://angular.io/api/core/Injectable
 * https://github.com/ngrx/effects
 */
@Injectable()
export class CommonEffects
{
  /**
   * @param action
   * @param Error
   * @param Loads
   * @param Complete
   * @param request
   * @returns http://reactivex.io/documentation/observable.html
   */
  public build$< A , L , E , C , S >(
    action : string ,
    Loads : any ,
    Error : any ,
    Complete : any ,
    request : Function ,
  )
  : Observable<A>
  {
    return this.actions$
      .ofType( action )
      .debounceTime( 100 )
      .map( ( o : any ) => o.payload )
      .do( ( o ) => this.common.dispatch( new Error( null ) ) )
      .do( ( o ) => this.common.dispatch( new Loads( true ) ) )
      .switchMap( request.bind( this ) )
      .do( ( o ) => this.common.dispatch( new Loads( false ) ) )
      .map( ( o : ApiError | any ) =>
      {
        return ( o.content )
          ? new Complete( o.content )
          : this.exception( o , Error )
          ;
      })
      ;
  }

  /**
   * @param r
   * @param ErrorAction
   * @returns CommonAction
   */
  public exception( r : ApiError , ErrorAction : any ) : CommonAction<any>
  {
    return ( r && r.error && r.error.message )
      ? new ErrorAction( r.error.message )
      : new ErrorAction( 'Error' )
      ;
  }

  /**
   * Constructor
   * @param actions$    https://github.com/ngrx/effects/blob/master/docs/intro.md
   * @param common      https://angular.io/tutorial/toh-pt4
   * @param api         https://angular.io/tutorial/toh-pt4
   */
  public constructor(
    protected readonly actions$ : Actions ,
    protected readonly common : CommonService ,
    protected readonly api : ApiService ,
  ) {}

}
