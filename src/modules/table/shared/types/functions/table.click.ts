/** @imports */
import { TableAbstract } from '../basic/table.abstract' ;
import { TableControl } from '../basic/table.schemas' ;
import { TableRow } from '../row/table.row' ;

/**
 * https://material.angular.io/components/table/overview
 */
export class TableClick extends TableAbstract
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly datas : TableControl | TableRow<TableControl> = null ,
  ) {
    super( key ) ;
  }

}
