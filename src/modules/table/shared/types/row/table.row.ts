/** @imports */
import { TableAbstractRow } from './table.abstract.row' ;

/**
 * https://material.angular.io/components/table/overview
 */
export class TableRow<T> extends TableAbstractRow<T>
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly raw : any = {} ,
    public readonly click : string = null ,
    public readonly children : Array<T> = new Array() ,
  ) {
    super
    (
      key ,
      raw ,
      click ,
      children ,
    ) ;
  }

}
