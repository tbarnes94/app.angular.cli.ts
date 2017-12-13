/** @imports */
import { CommonAction } from '../commons/shared/store/common.action' ;
import { Class } from '../helpers' ;

/** @exports */
export function TestAction< A extends CommonAction<P> , P >( Action : Class<A> , type : string , payload : P ) : void
{
  const action : A = new Action( payload ) ;
  expect( action.type ).toEqual( type ) ;
  expect( action.payload ).toEqual( payload ) ;
}
