/** @imports */
import { FormGroup } from '../group/form.group' ;
import { FormSection } from '../group/form.section' ;
import { FormCheck } from '../input/form.check' ;
import { FormDatepicker } from '../input/form.datepicker' ;
import { FormInput } from '../input/form.input' ;
import { FormRadio } from '../input/form.radio' ;
import { FormSelect } from '../input/form.select' ;
import { FormAction } from '../functions/form.action' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export type FormControl = FormCheck
  | FormDatepicker
  | FormInput
  | FormRadio
  | FormSelect
  ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSchemas
{
  public constructor
  (
    public readonly actions : Array<FormAction> = new Array() ,
    public readonly sections : Array<FormSection<FormGroup< FormGroup<FormControl> | FormControl >>> = new Array() ,
    public readonly divider : boolean = false ,
  ) {}

}
