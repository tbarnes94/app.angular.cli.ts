/** @imports */
import { clone } from 'lodash' ;
import { isArray } from 'lodash' ;
import { isObject } from 'lodash' ;

/**
 * @param input
 * @returns T
 */
export function immutable<T>( input : T ) : T
{
  return ( isArray( input ) || isObject( input ) )
    ? clone( input )
    : input
    ;
}
