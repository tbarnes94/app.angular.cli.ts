/**
 * @param input
 * @returns boolean
 */
export function isArray<T>( input : T ) : boolean
{
  return ( input instanceof Array ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotArray<T>( input : T ) : boolean
{
  return ( !isArray<T>( input ) ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isEmptyArray<T>( input : T ) : boolean
{
  return ( isArray<T>( input ) && ( input as any ).length < 1 ) ;
}

/**
 * @param input
 * @returns boolean
 */
export function isNotEmptyArray<T>( input : T ) : boolean
{
  return ( !isEmptyArray<T>( input ) ) ;
}
