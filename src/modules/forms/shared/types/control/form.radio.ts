import { AbstractControl } from './abstract.control';
import { FormOption } from './form.option';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormRadio extends AbstractControl {
  public readonly color?: string;
  public readonly options: Array<FormOption>;
}
