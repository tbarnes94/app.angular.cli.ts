/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export class StoreEvent
{
  public constructor(
    public readonly key : string = null ,
    public readonly message : string = null ,
    public readonly type : string = null ,
  ) {}

}
