/** @imports */
import { ObjectAny } from '../../../helpers' ;

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
