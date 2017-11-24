/** @imports */
import { FormAny } from '../form/form.functions' ;
import { FormAbstractInput } from './form.abstract.input' ;
import { FormOption } from './form.option' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormRadio extends FormAbstractInput
{
  public readonly color? : string ;
  public readonly options : FormAny | Array<FormOption> ;
}
