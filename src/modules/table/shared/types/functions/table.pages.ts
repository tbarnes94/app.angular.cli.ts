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
    public readonly current : number = 1 ,
  ) {}

}

/**
 * https://material.angular.io/components/table/overview
 */
export class TablePage extends TableAbstract
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly current : boolean = false ,
    public readonly first : boolean = false ,
    public readonly last : boolean = false ,
  ) {
    super( key ) ;
  }

}
