import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { CommonEffects } from '../../../commons';
import { ObjectStrings } from '../../../commons';
import { AuthCredentials } from '../types/auth.credentials';
import { AUTH_ERROR } from './auth.actions';
import { AuthError } from './auth.actions';
import { AuthLoader } from './auth.actions';
import { AUTH_LOGIN_START } from './auth.actions';
import { AUTH_LOGIN_COMPLETE } from './auth.actions';
import { AuthLoginComplete } from './auth.actions';
import { AUTH_LOGOUT } from './auth.actions';
import { AuthLogout } from './auth.actions';
import { AuthActions } from './auth.actions';

/**
 * https://angular.io/api/core/Injectable
 * https://github.com/ngrx/effects
 */
@Injectable()
export class AuthEffects extends CommonEffects {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  @Effect()
  public readonly login$: Observable<Action> = this.build$<AuthActions, AuthLoader, AuthError, AuthLoginComplete, ObjectStrings>(
    AUTH_LOGIN_START,
    AuthLoader,
    AuthError,
    AuthLoginComplete,
    (o: AuthCredentials) => {
      const auth: string = 'admin:secret!';
      return this.api.request<string, ObjectStrings>(
        undefined,
        `oauth/token`,
        'Post', {
          'Authorization': `Basic ${btoa(auth)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        `username=${o.username}&` +
        `password=${o.password}&` +
        `grant_type=password`
      );
    },
  )
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  @Effect({ dispatch: false })
  public readonly loginComplete$: Observable<Action> = this.actions$
    .ofType(AUTH_LOGIN_COMPLETE)
    .debounceTime(100)
    .do((o) => this.common.redirect([ 'dashboard' ]))
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  @Effect({ dispatch: false })
  public readonly logout$: Observable<Action> = this.actions$
    .ofType(AUTH_LOGOUT)
    .debounceTime(100)
    .do((o) => this.common.redirect([ 'auth' ]))
  ;

}
