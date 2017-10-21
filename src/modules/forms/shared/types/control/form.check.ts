import { AbstractControl } from './abstract.control';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormCheck extends AbstractControl {
  public readonly label: string;
  public readonly color?: string;
}
