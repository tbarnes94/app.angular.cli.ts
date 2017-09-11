import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CommonGuard } from '../../../commons';
import { CommonService } from '../../../commons';
import { AuthService } from '../service/auth.service';

/**
 * https://angular.io/api/core/Injectable
 * https://angular.io/api/router/CanActivate
 */
@Injectable()
export class AuthGuard extends CommonGuard {

  /**
   * Constructor
   * @param common    https://angular.io/tutorial/toh-pt4
   * @param auth      https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly common: CommonService,
                     protected readonly auth: AuthService) {
    super(common);
  }

  /**
   * https://angular.io/api/router/CanActivate#canActivate
   */
  public canActivate(): Observable<boolean> {
    return this.auth.token$
      .map((o: boolean) => {
        if (o) { return true; }
        this.common.redirect([ 'auth' ]);
        return false;
      })
      ;
  }

}
