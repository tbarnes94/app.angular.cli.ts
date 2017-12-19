/** @imports */
import { ValidatorFn } from '@angular/forms' ;
import { FormAbstractInput } from './form.abstract.input' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormCheck extends FormAbstractInput
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly element : string = 'check' ,
    public readonly label : string = null ,
    public readonly validators : Array<ValidatorFn> = new Array() ,
    public readonly disabled : boolean = false ,
    public readonly readonly : boolean = false ,
    public readonly value : boolean | string = null ,
    public readonly width : string = null ,
    public readonly color : string = 'primary' ,
  ) {
    super
    (
      key ,
      element ,
      label ,
      validators ,
      disabled ,
      readonly ,
      value ,
      width ,
    ) ;
  }

}
