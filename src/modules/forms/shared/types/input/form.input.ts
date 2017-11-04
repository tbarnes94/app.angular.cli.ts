/** @imports */
import { AbstractInput } from './abstract.input' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export class FormInput extends AbstractInput
{
  public readonly placeholder? : string ;
  public readonly maxlength? : number ;
  public readonly prefix? : string ;
  public readonly suffix? : string ;
  public readonly type? : string ;
}
