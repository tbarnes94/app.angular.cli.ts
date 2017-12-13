/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export class Operator
{
  public constructor(
    public readonly key : string = 'map' ,
    public readonly input : Array<any> = new Array() ,
    public readonly run : any = null ,
  ) {}

}
