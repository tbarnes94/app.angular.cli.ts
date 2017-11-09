/** @imports */
import { Class } from '../../types/class' ;
import { CommonPipe } from '../common.pipe' ;

/** @exports */
export function CommonPipeTest< P extends CommonPipe , C , R >( Pipe : Class<P> , current : any , results : R , ...options : Array<any> ) : void
{
  const pipe : P = new Pipe( null ) ;
  const outpt : string = pipe.transform( current , ...options ) ;
  expect( outpt ).toEqual( results ) ;
}
