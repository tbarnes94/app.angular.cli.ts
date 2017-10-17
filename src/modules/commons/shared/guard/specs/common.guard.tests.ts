/** @imports */
import { tick } from '@angular/core/testing' ;

import { Class } from '../../types/class' ;
import { CommonGuard } from '../common.guard' ;

/** @exports */
export function CommonGuardTest< G extends CommonGuard , R >( Guard : Class<G> , results : R ) : void
{
  let outpt : boolean ;
  const guard : G = new Guard( null ) ;
  guard.canActivate().subscribe( ( o ) => outpt = o ) ; tick() ;
  expect( outpt ).toEqual( results ) ;
}
