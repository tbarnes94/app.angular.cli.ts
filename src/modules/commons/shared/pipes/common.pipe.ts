/** @imports */
import { Pipe } from '@angular/core' ;
import { PipeTransform } from '@angular/core' ;

import { CommonService } from '../service/common.service' ;

/**
 * https://angular.io/api/core/Pipe
 * https://angular.io/api/core/PipeTransform
 */
@Pipe({ name : 'common' })
export class CommonPipe implements PipeTransform
{
  /**
   * https://angular.io/api/core/PipeTransform#transform
   */
  public transform( current : string , ...options : Array<any> ) : string
  {
    return current ;
  }

  /**
   * Constructor
   * @param common    https://angular.io/tutorial/toh-pt4
   */
  public constructor( protected readonly common : CommonService ) {}

}
