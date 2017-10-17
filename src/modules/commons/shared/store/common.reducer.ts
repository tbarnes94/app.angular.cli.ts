/** @imports */
import { ActionReducer } from '@ngrx/store' ;

import { immutable } from '../helpers/common.transformers' ;
import { CommonAction } from './common.action' ;

/**
 * https://github.com/ngrx/platform
 */
export function CommonReducer< S , A extends CommonAction<any> >( type : string , start : S = null ) : ActionReducer< S , A >
{
  return function ( state : S = start , action : A ) : S
  {
    if ( action.type === type ) { return immutable<S>( action.payload ) ; }
    return state ;
  } ;
}
