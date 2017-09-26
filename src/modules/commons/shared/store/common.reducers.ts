/** @imports */
import { ActionReducer } from '@ngrx/store' ;
import { combineReducers } from '@ngrx/store' ;

import { State } from '../types/state' ;
import { COMMON_LOADS } from './common.actions' ;
import { CommonLoads } from './common.actions' ;
import { CommonActions } from './common.actions' ;
import { CommonReducer } from './common.reducer' ;

/**
 * https://github.com/ngrx/platform
 */
export const CommonLoadsReducer : ActionReducer< boolean , CommonLoads > = CommonReducer< boolean , CommonLoads >( COMMON_LOADS , true ) ;

/**
 * https://github.com/ngrx/platform
 */
export function CommonReducers( state : any , action : CommonActions ) : any
{
  return combineReducers
  ({
    loads : CommonLoadsReducer ,
  })
  ( state , action ) ;

}
