/** @imports */
import { tick } from '@angular/core/testing' ;
import { Class } from '@kuwas/angular' ;
import { CommonGuard } from '@kuwas/angular' ;

/** @exports */
export function TestGuard< G extends CommonGuard , R >( Guard : Class<G> , results : R ) : void
{
  let outpt : boolean ;
  const guard : G = new Guard( null ) ;
  guard.canActivate().subscribe( ( o ) => outpt = o ) ; tick() ;
  expect( outpt ).toEqual( results ) ;
}
