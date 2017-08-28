import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

import { CommonService } from '../service/common.service';

/**
 * https://angular.io/guide/pipes
 */
@Pipe({ name: 'common' })
export class CommonPipe implements PipeTransform {

  /**
   * https://angular.io/api/core/PipeTransform
   */
  public transform(current: any, ...options: Array<any>): any {
    return current;
  }

  /**
   * Constructor
   * @param common    https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly common: CommonService) {
  }

}