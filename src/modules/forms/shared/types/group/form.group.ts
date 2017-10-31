/** @imports */
import { ObjectStrings } from '../../../../commons' ;
import { AbstractGroup } from './abstract.group' ;
import { FormBoolean } from './form.functions' ;
import { FormStrings } from './form.functions' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormGroup<T> extends AbstractGroup<T>
{
  public readonly label? : FormStrings | string ;
  public readonly tooltip? : string ;
  public readonly error? : ObjectStrings ;
  public readonly section? : boolean ;
  public readonly shown? : FormBoolean | boolean ;
  public readonly width? : string ;
}
