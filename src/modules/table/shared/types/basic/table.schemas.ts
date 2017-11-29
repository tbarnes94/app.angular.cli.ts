/** @imports */
import { TableCell } from '../cell/table.cell' ;
import { TableHead } from '../cell/table.head' ;
import { TableRow } from '../row/table.row' ;
import { TablePage } from './table.functions' ;
import { TableSort } from './table.functions' ;

/**
 * https://material.angular.io/components/table/overview
 */
export type TableControl = TableHead
  | TableCell
  ;

/**
 * https://material.angular.io/components/table/overview
 */
export class TableSchemas
{
  public readonly columns : TableRow<TableHead> ;
  public readonly rows : Array<TableRow<TableControl>> ;
  public readonly sorts : Array<TableSort> ;
  public readonly page : TablePage ;
  public readonly width : number ;
}
