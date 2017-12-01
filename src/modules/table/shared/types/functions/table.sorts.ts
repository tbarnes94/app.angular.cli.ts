/** @imports */
import { TableAbstract } from '../basic/table.abstract' ;

/**
 * https://material.angular.io/components/table/overview
 */
export class TableSort extends TableAbstract
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly order : string = null ,
  ) {
    super( key ) ;
  }

}
