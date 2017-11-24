/** @imports */
import { TableAbstract } from '../basic/table.abstract' ;

/**
 * https://material.angular.io/components/table/overview
 */
export abstract class TableAbstractRow<T> extends TableAbstract
{
  public readonly children : Array<T> ;
}
