import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { ApiResponse } from '../../../../modules/api';
import { CommonReset } from '../../../../modules/commons';
import { TemplateCommonEffects } from '../../../../modules/template';
import { AuthCredentials } from '../types/auth.credentials';
import { AuthToken } from '../types/auth.token';
import { AuthEvent } from './auth.actions';
import { AuthLoader } from './auth.actions';
import { AUTH_LOGIN_START } from './auth.actions';
import { AUTH_LOGIN_COMPLETE } from './auth.actions';
import { AuthLoginComplete } from './auth.actions';
import { AUTH_LOGOUT } from './auth.actions';
import { AuthActions } from './auth.actions';

/**
 * https://angular.io/api/core/Injectable
 * https://github.com/ngrx/effects
 */
@Injectable()
export class AuthEffects extends TemplateCommonEffects {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  @Effect()
  public readonly LoginStart$: Observable<Action> = this.build$<AuthActions, AuthLoader, AuthEvent, AuthLoginComplete, ApiResponse<AuthToken>>(
    AUTH_LOGIN_START,
    AuthLoader,
    AuthEvent,
    AuthLoginComplete,
    (o: AuthCredentials) => {
      const auth: string = 'admin:secret!';
      return this.api.request<string, AuthToken>(
        undefined,
        this.api.options.login.path,
        this.api.options.login.method,
        this.headers({
          'Authorization': `Basic ${btoa(auth)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
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
  public readonly LoginComplete$: Observable<Action> = this.actions$
    .ofType(AUTH_LOGIN_COMPLETE)
    .do((o) => this.common.redirect([ 'dashboard' ]))
  ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  @Effect()
  public readonly Logout$: Observable<Action> = this.actions$
    .ofType(AUTH_LOGOUT)
    .do((o) => this.common.redirect([ 'auth' ]))
    .map((o) => new CommonReset(null))
  ;

}
