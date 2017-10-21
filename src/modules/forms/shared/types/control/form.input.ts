import { AbstractControl } from './abstract.control';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormInput extends AbstractControl {
  public readonly placeholder?: string;
  public readonly maxlength?: number;
  public readonly type?: string;
}
