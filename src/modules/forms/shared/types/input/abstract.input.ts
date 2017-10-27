import { ValidatorFn } from '@angular/forms';
import { Abstract } from '../abstract/abstract';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export abstract class AbstractInput extends Abstract {
  public readonly element: string;
  public readonly validators: Array<ValidatorFn>;
  public readonly disabled?: boolean;
  public readonly readonly?: boolean;
  public readonly value: boolean | string;
  public readonly width?: string;
}
