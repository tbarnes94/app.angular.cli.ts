/** @imports */
import { Injectable } from '@angular/core' ;
import { Actions } from '@ngrx/effects' ;
import { Observable } from 'rxjs/Rx' ;

import { ApiService } from '../../../api/shared/service/api.service' ;
import { ApiError } from '../../../api/shared/types/api.error' ;
import { ApiResponse } from '../../../api/shared/types/api.response' ;
import { CommonService } from '../service/common.service' ;
import { Class } from '../types/class' ;
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
  public build$< A , L extends CommonAction<boolean> , E extends CommonAction<string> , C extends CommonAction<S> , S >(
    action : string ,
    Loads : Class<L> ,
    Error : Class<E> ,
    Complete : Class<C> ,
    request : Function ,
  )
  : Observable< E | C >
  {
    return this.actions$
      .ofType( action )
      // .debounceTime( 100 )
      .map( ( o : any ) => o.payload )
      .do( ( o ) => this.common.dispatch( new Error( null ) ) )
      .do( ( o ) => this.common.dispatch( new Loads( true ) ) )
      .concatMap( request.bind( this ) )
      .do( ( o ) => this.common.dispatch( new Loads( false ) ) )
      .map( ( o : any | ApiError ) =>
      {
        return ( o.content )
          ? new Complete( new ApiResponse( o.content , null , o.timestamp ) )
          : this.exception<E>( o , Error )
          ;
      })
      ;
  }

  /**
   * @param r
   * @param Action
   * @returns CommonAction
   */
  public exception<T>( r : ApiError , Action : Class<T> ) : T
  {
    this.common.totop() ;
    return ( r && r.error && r.error.message )
      ? new Action( r.error.message )
      : new Action( '00000' )
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
