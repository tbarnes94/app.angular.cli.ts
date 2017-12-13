/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export interface Class<T>
{
  new ( ...param : Array<any> ) : T ;
}
