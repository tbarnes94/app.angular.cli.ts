/** @imports */
import { toProperty } from './to.property' ;

/**
 * @param input
 * @param index
 * @returns T
 */
export function toResponse( input : any , index? : number ) : any
{
  return toProperty( 'response' , input ) ;
}
