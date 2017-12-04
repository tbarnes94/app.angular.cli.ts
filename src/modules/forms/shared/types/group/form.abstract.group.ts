/** @imports */
import { FormAbstract } from '../basic/form.abstract' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export abstract class FormAbstractGroup<T> extends FormAbstract
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly children : Array<T> = new Array() ,
  ) {
    super( key ) ;
  }

}
