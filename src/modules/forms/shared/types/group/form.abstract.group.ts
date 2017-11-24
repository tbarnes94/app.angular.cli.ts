/** @imports */
import { FormAbstract } from '../basic/form.abstract' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export abstract class FormAbstractGroup<T> extends FormAbstract
{
  public readonly children : Array<T> ;
}
