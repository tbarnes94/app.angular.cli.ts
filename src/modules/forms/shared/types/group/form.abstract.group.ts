/** @imports */
import { FormAbstract } from '../form/form.abstract' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export abstract class FormAbstractGroup<T> extends FormAbstract
{
  public readonly children : Array<T> ;
}
