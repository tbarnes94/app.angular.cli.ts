import { AbstractControl } from './abstract.control';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSelect extends AbstractControl {
  public readonly placeholder?: string;
  public readonly options: Array<{ title: string, value: string }>;
}
