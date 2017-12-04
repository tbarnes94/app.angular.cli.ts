/** @imports */
import { TableAbstract } from '../basic/table.abstract' ;

/**
 * https://material.angular.io/components/table/overview
 */
export abstract class TableAbstractCell extends TableAbstract
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly value : boolean | string = null ,
    public readonly align : string = null ,
    public readonly width : number = null ,
  ) {
    super( key ) ;
  }

}
