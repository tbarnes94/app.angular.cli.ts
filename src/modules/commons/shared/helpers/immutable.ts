/** @imports */
import * as clone from 'clone' ;
import { isArray } from './is.array' ;
import { isObject } from './is.object' ;

/**
 * @param input
 * @returns T
 */
export function immutable<T>( input : T ) : T
{
  return ( isArray<T>( input ) || isObject<T>( input ) )
    ? clone( input )
    : input
    ;
}
