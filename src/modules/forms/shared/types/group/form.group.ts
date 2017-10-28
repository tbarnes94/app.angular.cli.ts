import { ObjectStrings } from '../../../../commons';
import { AbstractGroup } from './abstract.group';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormGroup<T> extends AbstractGroup<T> {
  public readonly label?: string;
  public readonly tooltip?: string;
  public readonly error?: ObjectStrings;
  public readonly isSection?: boolean;
  public readonly width?: string;
}
