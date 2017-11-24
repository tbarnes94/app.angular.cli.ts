/** @imports */
import { TableAbstract } from '../basic/table.abstract' ;

/**
 * https://material.angular.io/components/table/overview
 */
export abstract class TableAbstractCell extends TableAbstract
{
  public readonly value : boolean | string ;
}
