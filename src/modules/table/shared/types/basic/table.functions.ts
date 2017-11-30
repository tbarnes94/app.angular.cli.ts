/** @imports */
import { TableAbstract } from './table.abstract' ;

/**
 * https://material.angular.io/components/table/overview
 */
export class TablePage
{
  public readonly current : number ;
  public readonly size : number ;
}

/**
 * https://material.angular.io/components/table/overview
 */
export class TableSort extends TableAbstract
{
  public readonly order : string ;
}
