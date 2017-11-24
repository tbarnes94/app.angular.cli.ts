/** @imports */
import { FormAbstract } from './form.abstract' ;
import { FormBoolean } from './form.functions' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormAction extends FormAbstract
{
  public readonly label : string ;
  public readonly element : string ;
  public readonly color? : string ;
  public readonly disabled? : FormBoolean | boolean ;
  public readonly route? : Array<string> ;
  public readonly click? : string ;
  public readonly href? : string ;
  public readonly target? : string ;
  public readonly type? : string ;
}
