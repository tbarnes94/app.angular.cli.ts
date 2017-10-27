import { AbstractInput } from './abstract.input';
import { FormOption } from './form.option';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormRadio extends AbstractInput {
  public readonly color?: string;
  public readonly options: Array<FormOption>;
}
