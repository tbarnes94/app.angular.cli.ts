/** @imports */
import { ObjectStrings } from '../../../../commons' ;
import { AbstractGroup } from './abstract.group' ;
import { FormLabel } from './form.functions' ;
import { FormShown } from './form.functions' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormGroup<T> extends AbstractGroup<T>
{
  public readonly label? : FormLabel ;
  public readonly tooltip? : string ;
  public readonly error? : ObjectStrings ;
  public readonly section? : boolean ;
  public readonly shown? : FormShown ;
  public readonly width? : string ;
}
