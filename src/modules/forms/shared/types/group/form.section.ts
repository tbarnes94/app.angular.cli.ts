/** @imports */
import { AbstractGroup } from './abstract.group' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSection<T> extends AbstractGroup<T>
{
  public readonly title? : string ;
  public readonly description? : string ;
  public readonly divider? : boolean ;
}
