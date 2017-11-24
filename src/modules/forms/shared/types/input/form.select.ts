/** @imports */
import { FormAny } from '../basic/form.functions' ;
import { FormAbstractInput } from './form.abstract.input' ;
import { FormOption } from './form.option' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSelect extends FormAbstractInput
{
  public readonly placeholder? : string ;
  public readonly options : FormAny | Array<FormOption> ;
}
