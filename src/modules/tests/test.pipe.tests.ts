/** @imports */
import { Class } from '@kuwas/angular' ;
import { CommonPipe } from '@kuwas/angular' ;

/** @exports */
export function TestPipe< P extends CommonPipe , C , R >( Pipe : Class<P> , current : any , results : R , ...options : Array<any> ) : void
{
  const pipe : P = new Pipe( null ) ;
  const outpt : string = pipe.transform( current , ...options ) ;
  expect( outpt ).toEqual( results ) ;
}
