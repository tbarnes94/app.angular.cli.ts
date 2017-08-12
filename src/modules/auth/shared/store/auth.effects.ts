import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { CommonLoader } from '../../../commons';
import { CommonEffects } from '../../../commons';
import { ObjectStrings } from '../../../commons';
import { AuthError } from './auth.actions';
import { AuthLoader } from './auth.actions';
import { AUTH_LOGIN_START } from './auth.actions';
import { AUTH_LOGIN_COMPLETE } from './auth.actions';
import { AuthLoginComplete } from './auth.actions';
import { AUTH_LOGOUT } from './auth.actions';
import { AuthLogout } from './auth.actions';
import { AuthActions } from './auth.actions';

/**
 * https://github.com/ngrx/effects
 */
@Injectable()
export class AuthEffects extends CommonEffects {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  @Effect()
  public loginStart$: Observable<AuthActions> = this.actions$
    .ofType(AUTH_LOGIN_START)
    .debounceTime(100)
    .map((o: AuthActions) => o.payload)
    .do((o) => this.common.dispatch(new AuthError(null)))
    .do((o) => this.common.dispatch(new AuthLoader(true)))
    .switchMap((o) => this.api.request<null, ObjectStrings>('https://api.github.com', `users/kuwas`, 'Get', {})) // undefined, login/webservices, Post
    .do((o) => this.common.dispatch(new AuthLoader(false)))
    .map((o: any) => {
      if (!o.error) {
        return new AuthLoginComplete(o.content);
      }
      this.common.dispatch(new AuthLogout(null));
      return new AuthError(o.error);
    })
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  @Effect({dispatch: false})
  public loginComplete$: Observable<AuthActions> = this.actions$
    .ofType(AUTH_LOGIN_COMPLETE)
    .debounceTime(100)
    .do((o: AuthActions) => this.common.redirect([ 'dashboard' ]))
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  @Effect({dispatch: false})
  public logout$: Observable<AuthActions> = this.actions$
    .ofType(AUTH_LOGOUT)
    .debounceTime(100)
    .do((o: AuthActions) => this.common.redirect([ 'login' ]))
    ;

}
