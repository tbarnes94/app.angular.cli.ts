/**
 * @param message
 * @param input
 */
export function print<T>( message : string , input : T ) : void
{
  return console.log( `<${message}>` , input ) ;
}
