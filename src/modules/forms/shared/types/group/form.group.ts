/** @imports */
import { ObjectStrings } from '../../../../commons' ;
import { FormAny } from '../form/form.functions' ;
import { FormBoolean } from '../form/form.functions' ;
import { FormVoid } from '../form/form.functions' ;
import { FormAbstractGroup } from './form.abstract.group' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormGroup<T> extends FormAbstractGroup<T>
{
  public readonly section? : boolean ;
  public readonly label? : FormAny | string ;
  public readonly error? : FormAny | ObjectStrings ;
  public readonly shown? : FormBoolean | boolean ;
  public readonly onValue? : FormVoid ;
  public readonly tooltip? : string ;
  public readonly width? : string ;
}
