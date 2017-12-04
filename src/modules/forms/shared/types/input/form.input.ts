/** @imports */
import { ValidatorFn } from '@angular/forms' ;
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
    public readonly validators : Array<ValidatorFn> = new Array() ,
    public readonly disabled : boolean = false ,
    public readonly readonly : boolean = false ,
    public readonly value : boolean | string = null ,
    public readonly width : string = null ,
    public readonly placeholder : string = null ,
    public readonly maxlength : number = null ,
    public readonly prefix : string = null ,
    public readonly suffix : string = null ,
    public readonly type : string = 'text' ,
  ) {
    super
    (
      key ,
      element ,
      validators ,
      disabled ,
      readonly ,
      value ,
      width ,
    ) ;
  }

}
