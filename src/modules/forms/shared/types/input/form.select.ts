/** @imports */
import { ValidatorFn } from '@angular/forms' ;
import { FormAny } from '../functions/form.any' ;
import { FormAbstractInput } from './form.abstract.input' ;
import { FormOption } from './form.option' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSelect extends FormAbstractInput
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly element : string = 'select' ,
    public readonly label : FormAny | string = null ,
    public readonly validators : Array<ValidatorFn> = new Array() ,
    public readonly disabled : boolean = false ,
    public readonly required : boolean = false ,
    public readonly readonly : boolean = false ,
    public readonly value : boolean | string = null ,
    public readonly width : string = null ,
    public readonly options : FormAny | Array<FormOption> = new Array() ,
    public readonly hint : boolean = false ,
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
