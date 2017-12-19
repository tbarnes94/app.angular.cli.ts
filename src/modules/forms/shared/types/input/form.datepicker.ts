/** @imports */
import { ValidatorFn } from '@angular/forms' ;
import { FormAny } from '../functions/form.any' ;
import { FormInput } from './form.input' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormDatepicker extends FormInput
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly element : string = 'datepicker' ,
    public readonly label : FormAny | string = null ,
    public readonly validators : Array<ValidatorFn> = new Array() ,
    public readonly disabled : boolean = false ,
    public readonly required : boolean = false ,
    public readonly readonly : boolean = false ,
    public readonly value : Date | boolean | string = null ,
    public readonly width : string = null ,
    public readonly min : Date = null ,
    public readonly max : Date = null ,
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
