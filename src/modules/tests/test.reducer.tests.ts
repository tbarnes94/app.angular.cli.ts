/** @imports */
import { ActionReducer } from '@ngrx/store' ;

import { CommonAction } from '../commons/shared/store/common.action' ;
import { Class } from '../helpers' ;

/** @exports */
export function TestReducer<S>( Reducer : any , results : S ) : void
{
  const state : S = Reducer( undefined , { type : undefined , payload : undefined } ) ;
  expect( state ).toEqual( results ) ;
}

/** @exports */
export function TestReducerAction< A extends CommonAction<P> , P , S >( Action : Class<A> , Reducer : ActionReducer< S , A > , payload : P , results : S ) : void
{
  const action : A = new Action( payload ) ;
  const state : S = Reducer( undefined , action ) ;
  expect( state ).toEqual( results ) ;
}
