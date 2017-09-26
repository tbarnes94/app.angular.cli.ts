/** @imports */
import { tick } from '@angular/core/testing' ;

import { CommonAction } from '../common.action' ;

/** @exports */
export function CommonActionTest< A extends CommonAction<P> , P >( Action : any , type : string , payload : P ) : void
{
  const action : A = new Action( payload ) ;
  expect( action.type ).toEqual( type ) ;
  expect( action.payload ).toEqual( payload ) ;
}
