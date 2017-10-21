import { Abstract } from '../abstract/abstract';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export abstract class AbstractGroup<T> extends Abstract {
  public readonly children: Array<T>;
}
