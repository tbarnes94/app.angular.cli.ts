/** @imports */
import { isEmpty as _isEmpty } from 'lodash' ;

/**
 * @param input
 * @returns boolean
 */
export function isEmpty<T>( input : T ) : boolean
{
  return ( _isEmpty( input ) ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotEmpty<T>( input : T ) : boolean
{
  return ( !isEmpty( input ) ) ;
}
