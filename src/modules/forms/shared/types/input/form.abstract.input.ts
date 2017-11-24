/** @imports */
import { ValidatorFn } from '@angular/forms' ;
import { FormAbstract } from '../basic/form.abstract' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export abstract class FormAbstractInput extends FormAbstract
{
  public readonly element : string ;
  public readonly validators : Array<ValidatorFn> ;
  public readonly disabled? : boolean ;
  public readonly readonly? : boolean ;
  public readonly value : boolean | string ;
  public readonly width? : string ;
}
