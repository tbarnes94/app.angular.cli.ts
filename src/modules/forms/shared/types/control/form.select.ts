import { AbstractControl } from './abstract.control';
import { FormOption } from './form.option';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSelect extends AbstractControl {
  public readonly placeholder?: string;
  public readonly options: Array<FormOption>;
}
