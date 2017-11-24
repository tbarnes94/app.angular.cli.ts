/** @imports */
import { FormAbstractInput } from './form.abstract.input' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormInput extends FormAbstractInput
{
  public readonly placeholder? : string ;
  public readonly maxlength? : number ;
  public readonly prefix? : string ;
  public readonly suffix? : string ;
  public readonly type? : string ;
}
