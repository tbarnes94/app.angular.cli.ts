/** @imports */
import { ObjectStrings } from '../../../../commons' ;
import { AbstractGroup } from './abstract.group' ;
import { FormAny } from './form.functions' ;
import { FormBoolean } from './form.functions' ;
import { FormVoid } from './form.functions' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormGroup<T> extends AbstractGroup<T>
{
  public readonly section? : boolean ;
  public readonly label? : FormAny | string ;
  public readonly error? : FormAny | ObjectStrings ;
  public readonly shown? : FormBoolean | boolean ;
  public readonly onValue? : FormVoid ;
  public readonly tooltip? : string ;
  public readonly width? : string ;
}
