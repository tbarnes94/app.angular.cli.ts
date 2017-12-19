/** @imports */
import { ValidatorFn } from '@angular/forms' ;
import { FormAny } from '../functions/form.any' ;
import { FormAbstractInput } from './form.abstract.input' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormInput extends FormAbstractInput
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly element : string = 'input' ,
    public readonly label : FormAny | string = null ,
    public readonly validators : Array<ValidatorFn> = new Array() ,
    public readonly disabled : boolean = false ,
    public readonly required : boolean = false ,
    public readonly readonly : boolean = false ,
    public readonly value : Date | boolean | string = null ,
    public readonly width : string = null ,
    public readonly maxlength : number = null ,
    public readonly prefix : string = null ,
    public readonly suffix : string = null ,
    public readonly type : string = 'text' ,
  ) {
    super
    (
      key ,
      element ,
      label ,
      validators ,
      disabled ,
      required ,
      readonly ,
      value ,
      width ,
    ) ;
  }

}
