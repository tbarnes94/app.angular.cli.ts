/** @imports */
import { Abstract } from '../abstract/abstract' ;
import { FormBoolean } from '../group/form.functions' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormAction extends Abstract
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
