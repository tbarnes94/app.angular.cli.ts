/** @imports */
import { TableAbstract } from '../basic/table.abstract' ;

/**
 * https://material.angular.io/components/table/overview
 */
export abstract class TableAbstractRow<T> extends TableAbstract
{
  public constructor
  (
    public readonly key : string = null ,
    public readonly raw : any = {} ,
    public readonly route : Array<string> = null ,
    public readonly children : Array<T> = new Array() ,
  ) {
    super( key ) ;
  }

}
