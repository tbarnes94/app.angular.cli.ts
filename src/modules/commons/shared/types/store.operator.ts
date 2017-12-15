/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export class StoreOperator
{
  public constructor(
    public readonly key : string = 'map' ,
    public readonly param : Array<any> = new Array() ,
    public readonly process : any = null ,
    public readonly context : any = null ,
  ) {}

}
