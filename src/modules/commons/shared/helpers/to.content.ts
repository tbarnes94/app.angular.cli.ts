/** @imports */
import { toProperty } from './to.property' ;

/**
 * @param input
 * @param index
 * @returns T
 */
export function toContent( input : any , index? : number ) : any
{
  return toProperty( 'content' , input ) ;
}
