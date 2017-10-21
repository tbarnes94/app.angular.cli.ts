import { Abstract } from '../abstract/abstract';

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormAction extends Abstract {
  public readonly label: string;
  public readonly element: string;
  public readonly color?: string;
  public readonly click?: string;
  public readonly disabled?: boolean;
  public readonly href?: string;
  public readonly type?: string;
}
