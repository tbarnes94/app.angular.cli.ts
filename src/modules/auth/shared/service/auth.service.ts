import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiResponse } from '../../../api';
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
  public readonly token$: Observable<boolean> = this.common.select([ 'auth', 'token' ])
    .map((o: ApiResponse<AuthToken>) => (!!o && !!o.content && !!o.content.access_token))
    ;

  /**
   * Constructor
   * @param common      https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly common: CommonService) {
  }

}
