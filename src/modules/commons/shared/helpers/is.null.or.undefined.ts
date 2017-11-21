/**
 * @param input
 * @returns boolean
 */
export function isNullOrUndefined<T>( input : T ) : boolean
{
  return ( input === null || input === void 0 ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotNullOrUndefined<T>( input : T ) : boolean
{
  return ( !isNullOrUndefined<T>( input ) ) ;
}
