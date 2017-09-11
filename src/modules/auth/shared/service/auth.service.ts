import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CommonService } from '../../../commons/shared/service/common.service';
import { AuthToken } from '../types/auth.token';

/**
 * https://angular.io/api/core/Injectable
 */
@Injectable()
export class AuthService {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly token$: Observable<boolean> = this.common
    .select([ 'auth', 'token' ])
    .map((o: AuthToken) => (o !== null && o.access_token !== undefined))
    ;

  /**
   * Constructor
   * @param common      https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly common: CommonService) {
  }

}
