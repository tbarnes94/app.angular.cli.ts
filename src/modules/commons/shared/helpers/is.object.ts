/** @imports */
import { isNotArray } from './is.array' ;
import { isNotNullOrUndefined } from './is.null.or.undefined' ;

/**
 * @param input
 * @returns boolean
 */
export function isObject<T>( input : T ) : boolean
{
  return ( typeof input === 'object' && isNotNullOrUndefined<T>( input ) && isNotArray<T>( input ) ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotObject<T>( input : T ) : boolean
{
  return ( !isObject<T>( input ) ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isEmptyObject<T>( input : T ) : boolean
{
  return ( isObject<T>( input ) && Object.keys( input ).length < 1 ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotEmptyObject<T>( input : T ) : boolean
{
  return ( !isEmptyObject<T>( input ) ) ;
}
