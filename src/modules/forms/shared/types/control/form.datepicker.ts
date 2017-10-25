import { AbstractControl } from './abstract.control';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormDatepicker extends AbstractControl {
  public readonly min?: Date;
  public readonly max?: Date;
  public readonly placeholder?: string;
  public readonly maxlength?: number;
  public readonly type?: string;
}
