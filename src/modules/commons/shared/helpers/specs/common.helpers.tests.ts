/** @imports */
import { tick } from '@angular/core/testing' ;

/** @exports */
export function CommonBooleanTest< P , R >( Helper : any , payload : P , results : R ) : void
{
  const outpt : R = Helper( payload ) ;
  expect( outpt ).toEqual( results ) ;
}
