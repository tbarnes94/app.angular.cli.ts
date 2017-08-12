import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CommonService } from '../../../commons/shared/service/common.service';

/**
 * https://angular.io/tutorial/toh-pt4
 */
@Injectable()
export class AuthService {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public token$: Observable<boolean>;

  /**
   * Constructor
   * @param common      https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly common: CommonService) {
    this.token$ = this.common
      .select([ 'auth', 'token' ])
      .map((o) => (o !== null))
    ;
  }

}
