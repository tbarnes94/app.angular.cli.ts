/** @imports */
import { TableCell } from '../cell/table.cell' ;
import { TableHead } from '../cell/table.head' ;
import { TablePageSchemas } from '../functions/table.pages' ;
import { TableSort } from '../functions/table.sorts' ;
import { TableRow } from '../row/table.row' ;

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
  public constructor
  (
    public readonly heads : TableRow<TableHead> = null ,
    public readonly bodys : Array<TableRow<TableControl>> = new Array() ,
    public readonly sorts : Array<TableSort> = new Array() ,
    public readonly pages : TablePageSchemas = null ,
    public readonly width : number = 0 ,
  ) {}

}
