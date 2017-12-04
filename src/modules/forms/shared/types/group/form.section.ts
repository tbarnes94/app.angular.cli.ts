/** @imports */
import { FormAbstractGroup } from './form.abstract.group' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormSection<T> extends FormAbstractGroup<T>
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly title : string = null ,
    public readonly subtitle : string = null ,
    public readonly divider : boolean = false ,
    public readonly children : Array<T> = new Array() ,
  ) {
    super
    (
      key ,
      children
    ) ;
  }

}
