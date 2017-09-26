/** @imports */
import { tick } from '@angular/core/testing' ;

/** @exports */
export function CommonGuardTest( Guard : any , results : boolean ) : void
{
  let outpt : boolean ;
  const G : any = new Guard( null ) ;
  G.canActivate().subscribe( ( o ) => outpt = o ) ; tick() ;
  expect( outpt ).toEqual( results ) ;
}
