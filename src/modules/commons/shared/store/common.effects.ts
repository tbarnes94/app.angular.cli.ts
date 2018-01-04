/** @imports */
import { Injectable } from '@angular/core' ;
import { Actions } from '@ngrx/effects' ;
import { Observable } from 'rxjs/Rx' ;

import { ApiService } from '../../../api' ;
import { ApiError } from '../../../api' ;
import { ApiResponse } from '../../../api' ;
import { Class } from '../../../helpers' ;
import { CommonService } from '../service/common.service' ;
import { StoreEvent } from '../types/store.event' ;
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
   * @param Loads
   * @param Event
   * @param Complete
   * @param request
   * @returns http://reactivex.io/documentation/observable.html
   */
  public build$< A , L extends CommonAction<boolean> , E extends CommonAction<StoreEvent> , C extends CommonAction<S> , S >(
    action : string ,
    Loads : Class<L> ,
    Event : Class<E> ,
    Complete : Class<C> ,
    request : Function ,
  )
  : Observable<any>
  {
    return this.actions$
      .ofType( action )
      // .debounceTime( 100 )
      .map( ( o : any ) => o.payload )
      .do( ( o ) => this.common.dispatch( new Event( null ) ) )
      .do( ( o ) => this.common.dispatch( new Loads( true ) ) )
      .concatMap( request.bind( this ) )
      .do( ( o ) => this.common.dispatch( new Loads( false ) ) )
      .map( ( o : any ) =>
      {
        this.common.totop() ;
        this.common.dispatch( this.event<E>( o , Event ) ) ;
        return ( !!o.content )
          ? new Complete( o )
          : new Complete( null )
          ;
      })
      ;
  }

  /**
   * @param r
   * @param Event
   * @returns CommonAction
   */
  public event<E>( r : any /* ApiResponse<any> | ApiError */ , Event : Class<E> ) : E
  {
    return ( !r.content )
      ? ( !!r.error && !!r.error.message )
        ? new Event( new StoreEvent( 'error' , r.response , r.timestamp , r.error.message ) )
        : new Event( new StoreEvent( 'error' , r.response , r.timestamp , '00000' ) )
      : ( !!r.content && !!r.content.message )
        ? new Event( new StoreEvent( 'success' , r.response , r.timestamp , r.content.message ) )
        : new Event( null )
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
