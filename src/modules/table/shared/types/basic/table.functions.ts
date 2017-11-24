/** @imports */
import { TableControl } from './table.schemas' ;

/**
 * https://material.angular.io/components/table/overview
 */
export type TableSort = ( content : Array<TableControl> ) => Array<TableControl> ;
