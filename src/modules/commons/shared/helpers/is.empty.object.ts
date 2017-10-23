/** @imports */
import { isEmpty } from 'lodash' ;
import { isObject } from 'lodash' ;

/**
 * @param input
 * @returns boolean
 */
export function isEmptyObject<T>( input : T ) : boolean
{
  return ( isObject( input ) && isEmpty( input ) ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotEmptyObject<T>( input : T ) : boolean
{
  return ( !isEmptyObject<T>( input ) ) ;
}
