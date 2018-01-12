import { Injectable } from '@angular/core';
import { CommonService } from '@kuwas/angular';
import { StoreOperator } from '@kuwas/angular';
import { toProperty } from '@kuwas/angular';
import { Observable } from 'rxjs/Rx';

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
      [ new StoreOperator( 'map', [], toProperty.bind(this, 'content') ) ]
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
