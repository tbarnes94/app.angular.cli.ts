/** @imports */
import { ObjectStrings } from '@kuwas/angular' ;
import { FormAny } from '../functions/form.any' ;
import { FormBoolean } from '../functions/form.boolean' ;
import { FormVoid } from '../functions/form.void' ;
import { FormAbstractGroup } from './form.abstract.group' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormGroup<T> extends FormAbstractGroup<T>
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly section : boolean = false ,
    public readonly label : FormAny | string = null ,
    public readonly error : FormAny | ObjectStrings = {} ,
    public readonly shown : FormBoolean | boolean = true ,
    public readonly onValue : FormVoid = null ,
    public readonly tooltip : string = null ,
    public readonly width : string = null ,
    public readonly children : Array<T> = new Array() ,
  ) {
    super
    (
      key ,
      children
    ) ;
  }

}
