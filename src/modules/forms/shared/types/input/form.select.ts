/** @imports */
import { FormAny } from '../abstract/form.functions' ;
import { AbstractInput } from './abstract.input' ;
import { FormOption } from './form.option' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSelect extends AbstractInput
{
  public readonly placeholder? : string ;
  public readonly options : FormAny | Array<FormOption> ;
}
