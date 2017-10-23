/** @imports */
import { isArray } from 'lodash' ;
import { isEmpty } from 'lodash' ;

/**
 * @param input
 * @returns boolean
 */
export function isEmptyArray<T>( input : T ) : boolean
{
  return ( isArray( input ) && isEmpty( input ) ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotEmptyArray<T>( input : T ) : boolean
{
  return ( !isEmptyArray<T>( input ) ) ;
}
