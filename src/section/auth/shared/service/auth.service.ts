import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Operator } from '../../../../modules/helpers';
import { toProperty } from '../../../../modules/helpers';
import { CommonService } from '../../../../modules/commons/shared/service/common.service';
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
    .select(
      [ 'auth', 'token' ],
      [ new Operator( 'map', [], toProperty.bind(this, 'content') ) ]
    )
    .map((o: AuthToken) => (!!o && !!o.access_token))
    ;

  /**
   * Constructor
   * @param common      https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly common: CommonService) {
  }

}
