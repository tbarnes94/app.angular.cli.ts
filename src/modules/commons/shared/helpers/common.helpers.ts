import { clone } from 'lodash';
import { isArray } from 'lodash';
import { isEmpty as _isEmpty } from 'lodash';
import { isNull } from 'lodash';
import { isObject } from 'lodash';
import { isUndefined } from 'lodash';
import { Observable } from 'rxjs/Rx';

/**
 * @param input
 * @returns boolean
 */
export function isEmptyArray<T>(input: T): boolean {
  return ( isArray(input) && isEmpty(input) );
}

/**
 * @param input
 * @returns boolean
 */
export function isNotEmptyArray<T>(input: T): boolean {
  return ( !isEmptyArray<T>(input) );
}

/**
 * @param input
 * @returns boolean
 */
export function isEmptyObject<T>(input: T): boolean {
  return ( isObject(input) && isEmpty(input) );
}

/**
 * @param input
 * @returns boolean
 */
export function isNotEmptyObject<T>(input: T): boolean {
  return ( !isEmptyObject<T>(input) );
}

/**
 * @param input
 * @returns boolean
 */
export function isNullOrUndefined<T>(input: T): boolean {
  return ( isUndefined(input) || isNull(input) );
}

/**
 * @param input
 * @returns boolean
 */
export function isNotNullOrUndefined<T>(input: T): boolean {
  return ( !isNullOrUndefined<T>(input) );
}

/**
 * @param input
 * @returns boolean
 */
export function isEmpty<T>(input: T): boolean {
  return ( _isEmpty(input) );
}

/**
 * @param input
 * @returns boolean
 */
export function isNotEmpty<T>(input: T): boolean {
  return ( !isEmpty(input) );
}

/**
 * @param input
 * @returns T
 */
export function immutable<T>(input: T): T {
  return ( isArray(input) || isObject(input) )
    ? clone(input)
    : input
    ;
}

/**
 * @param message
 * @param input
 */
export function print<T>(message: string, input: T): void {
  return console.log(`<${message}>`, input);
}

/**
 * @param input
 * @returns         http://reactivex.io/documentation/observable.html
 */
export function error<T>(input: T): Observable<T> {
  return Observable.of(input);
}
