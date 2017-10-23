/** @imports */
import { isNull } from 'lodash' ;
import { isUndefined } from 'lodash' ;

/**
 * @param input
 * @returns boolean
 */
export function isNullOrUndefined<T>( input : T ) : boolean
{
  return ( isUndefined( input ) || isNull( input ) ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotNullOrUndefined<T>( input : T ) : boolean
{
  return ( !isNullOrUndefined<T>( input ) ) ;
}
