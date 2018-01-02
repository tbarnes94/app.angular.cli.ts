/** @imports */
import { HttpResponseBase } from '@angular/common/http' ;

/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export class StoreEvent
{
  public constructor(
    public readonly key : string = null ,
    public readonly response : HttpResponseBase = null ,
    public readonly timestamp : Date = null ,
    public readonly message : string = null ,
  ) {}

}
