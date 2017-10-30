/** @imports */
import { FormInput } from './form.input' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormDatepicker extends FormInput
{
  public readonly min? : Date ;
  public readonly max? : Date ;
}
