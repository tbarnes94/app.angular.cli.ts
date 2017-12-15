/** @imports */
import { Action } from '@ngrx/store' ;

/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export class StoreCache< T extends Action = Action >
{
  public constructor(
    public readonly refresh : T = null ,
    public readonly expires : number = 0 ,
  ) {}

}
