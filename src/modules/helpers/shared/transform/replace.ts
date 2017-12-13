/**
 * @param input
 * @param texts
 * @returns string
 */
export function replace( input : string , texts : Array<string> = new Array() ) : string
{
  return texts.reduce
  (
    ( total , current , index ) =>
    {
      const key : number = index + 1 ;
      return total.replace( `%${key}` , current ) ;
    } ,
    input ,
  ) ;

}
