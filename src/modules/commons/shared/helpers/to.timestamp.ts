/** @imports */
import { toProperty } from './to.property' ;

/**
 * @param input
 * @param index
 * @returns T
 */
export function toTimestamp( input : any , index? : number ) : any
{
  return toProperty( 'timestamp' , input ) ;
}
