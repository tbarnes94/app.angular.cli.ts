import { FormGroup } from '../group/form.group';
import { FormSection } from '../group/form.section';
import { FormCheck } from '../input/form.check';
import { FormDatepicker } from '../input/form.datepicker';
import { FormInput } from '../input/form.input';
import { FormRadio } from '../input/form.radio';
import { FormSelect } from '../input/form.select';
import { FormAction } from './form.action';

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
export class FormSchemas {
  public readonly actions?: Array<FormAction>;
  public readonly sections: Array<FormSection<FormGroup<FormControl>>>;
  public readonly divider?: boolean;
}
