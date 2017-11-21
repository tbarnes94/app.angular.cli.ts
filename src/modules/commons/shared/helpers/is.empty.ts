/** @imports */
import { isEmptyArray } from './is.array' ;
import { isNullOrUndefined } from './is.null.or.undefined' ;
import { isEmptyObject } from './is.object' ;

/**
 * @param input
 * @returns boolean
 */
export function isEmpty<T>( input : T ) : boolean
{
  return (
    isEmptyArray<T>( input ) ||
    isEmptyObject<T>( input ) ||
    isNullOrUndefined<T>( input ) ||
    ( input as any ) === false ||
    ( input as any ) === '' ||
    ( input as any ) === 0
  ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotEmpty<T>( input : T ) : boolean
{
  return ( !isEmpty<T>( input ) ) ;
}
