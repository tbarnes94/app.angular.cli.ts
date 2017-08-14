import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { CommonService } from '../service/common.service';

/**
 * https://angular.io/guide/router#milestone-5-route-guards
 */
@Injectable()
export class CommonGuard implements CanActivate {

  /**
   * https://angular.io/api/router/CanActivate
   */
  public canActivate(): Observable<boolean> {
    return Observable.of(false);
  }

  /**
   * Constructor
   * @param common    https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly common: CommonService) {
  }

}
