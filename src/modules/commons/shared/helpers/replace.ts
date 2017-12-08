/**
 * @param input
 * @param options
 * @returns string
 */
export function replace( input : string , options : Array<string> = new Array() ) : string
{
  return options.reduce
  (
    ( total , current , index ) =>
    {
      const key : number = index + 1 ;
      return total.replace( `%${key}` , current ) ;
    } ,
    input ,
  ) ;

}
