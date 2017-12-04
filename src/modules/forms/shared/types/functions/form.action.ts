/** @imports */
import { FormAbstract } from '../basic/form.abstract' ;
import { FormBoolean } from './form.boolean' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormAction extends FormAbstract
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly element : string = 'button' ,
    public readonly label : string = null ,
    public readonly color : string = 'primary' ,
    public readonly disabled : FormBoolean | boolean = false ,
    public readonly route : Array<string> = null ,
    public readonly click : string = null ,
    public readonly href : string = null ,
    public readonly target : string = null ,
    public readonly type : string = null ,
  ) {
    super( key ) ;
  }

}
