/** @imports */
import { TableAbstractCell } from './table.abstract.cell' ;

/**
 * https://material.angular.io/components/table/overview
 */
export class TableCell extends TableAbstractCell
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly value : boolean | string = null ,
    public readonly shown : boolean = true ,
    public readonly align : string = 'l' ,
    public readonly width : number = 0 ,
    public readonly click : string = null ,
    public readonly icon : string = null ,
  ) {
    super
    (
      key ,
      value ,
      shown ,
      align ,
      width ,
    ) ;
  }

}
