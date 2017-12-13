/**
 * @param key
 * @param input
 * @returns O
 */
export function toProperty< I , O >( key : string , input : I ) : O
{
  return ( !!input && !!input[ key ] ) ? input[ key ] : input ;
}
