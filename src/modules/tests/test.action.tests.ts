/** @imports */
import { Class } from '@kuwas/angular' ;
import { CommonAction } from '@kuwas/angular' ;

/** @exports */
export function TestAction< A extends CommonAction<P> , P >( Action : Class<A> , type : string , payload : P ) : void
{
  const action : A = new Action( payload ) ;
  expect( action.type ).toEqual( type ) ;
  expect( action.payload ).toEqual( payload ) ;
}
