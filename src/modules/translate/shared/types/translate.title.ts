/** @imports */
import { ObjectAny } from '../../../commons' ;

/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
export class TranslateTitle
{
  public constructor(
    public readonly titles : Array<string> ,
    public readonly translations : ObjectAny ,
  ) {}

}
