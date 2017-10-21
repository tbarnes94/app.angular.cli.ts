import { FormGroup } from '../group/form.group';
import { FormCheck } from '../control/form.check';
import { FormInput } from '../control/form.input';
import { FormRadio } from '../control/form.radio';
import { FormSelect } from '../control/form.select';
import { FormSection } from '../group/form.section';
import { FormAction } from './form.action';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export type FormControl = FormInput
  | FormCheck
  | FormRadio
  | FormSelect
  ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSchemas {
  public readonly actions?: Array<FormAction>;
  public readonly sections: Array< FormSection< FormGroup< FormControl > > >;
}
