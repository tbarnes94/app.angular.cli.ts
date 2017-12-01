/** @imports */
import { TableAbstract } from '../basic/table.abstract' ;

/**
 * https://material.angular.io/components/table/overview
 */
export class TablePageSchemas
{
  public constructor
  (
    public readonly size : number = 0 ,
    public current : number = 1 ,
  ) {}

}

/**
 * https://material.angular.io/components/table/overview
 */
export class TablePage
{
  public constructor
  (
    public readonly key : number = 1 ,
    public readonly current : boolean = false ,
    public readonly first : boolean = false ,
    public readonly last : boolean = false ,
  ) {}

}

/**
 * https://material.angular.io/components/table/overview
 */
export class TablePages
{
  public constructor
  (
    public readonly schemas : TablePageSchemas = null ,
    public readonly pages : Array<TablePage> = new Array() ,
  ) {}

}
