import { AbstractControl } from './abstract.control';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormRadio extends AbstractControl {
  public readonly color?: string;
  public readonly options: Array<{ title: string, value: string }>;
}
