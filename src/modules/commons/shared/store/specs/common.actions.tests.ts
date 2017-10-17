/** @imports */
import { tick } from '@angular/core/testing' ;

import { Class } from '../../types/class' ;
import { CommonAction } from '../common.action' ;

/** @exports */
export function CommonActionTest< A extends CommonAction<P> , P >( Action : Class<A> , type : string , payload : P ) : void
{
  const action : A = new Action( payload ) ;
  expect( action.type ).toEqual( type ) ;
  expect( action.payload ).toEqual( payload ) ;
}
