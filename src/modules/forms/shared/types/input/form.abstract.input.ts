/** @imports */
import { ValidatorFn } from '@angular/forms' ;
import { FormAbstract } from '../basic/form.abstract' ;
import { FormAny } from '../functions/form.any' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export abstract class FormAbstractInput extends FormAbstract
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly element : string = null ,
    public readonly label : FormAny | string = null ,
    public readonly validators : Array<ValidatorFn> = new Array() ,
    public readonly disabled : boolean = false ,
    public readonly required : boolean = false ,
    public readonly readonly : boolean = false ,
    public readonly value : Date | boolean | string = null ,
    public readonly width : string = null ,
  ) {
    super( key ) ;
  }

}
