/** @imports */
import { clone } from 'lodash' ;
import { isArray } from 'lodash' ;
import { isObject } from 'lodash' ;
import { Observable } from 'rxjs/Rx' ;

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

/**
 * @param key
 * @param input
 * @returns O
 */
export function toProperty< I , O >( key : string , input : I ) : O
{
  return ( !!input && !!input[ key ] ) ? input[ key ] : input ;
}

/**
 * @param input
 * @param index
 * @returns T
 */
export function toContent( input : any , index? : number ) : any
{
  return toProperty( 'content' , input ) ;
}

/**
 * @param input
 * @param index
 * @returns T
 */
export function toResponse( input : any , index? : number ) : any
{
  return toProperty( 'response' , input ) ;
}

/**
 * @param input
 * @param index
 * @returns T
 */
export function toTimestamp( input : any , index? : number ) : any
{
  return toProperty( 'timestamp' , input ) ;
}

/**
 * @param input
 * @returns http://reactivex.io/documentation/observable.html
 */
export function error<T>( input : T ) : Observable<T>
{
  return Observable.of( input ) ;
}
