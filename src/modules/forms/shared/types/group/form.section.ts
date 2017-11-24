/** @imports */
import { FormAbstractGroup } from './form.abstract.group' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSection<T> extends FormAbstractGroup<T>
{
  public readonly title? : string ;
  public readonly description? : string ;
  public readonly divider? : boolean ;
}
