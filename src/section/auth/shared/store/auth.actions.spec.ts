import { ApiResponse } from '../../../../modules/api';
import { StoreEvent } from '../../../../modules/commons';
import { TestAction } from '../../../../modules/tests/test.action.tests';
import { TestSuite } from '../../../../modules/tests/test.suite.tests';
import { AuthCredentials } from '../types/auth.credentials';
import { AuthToken } from '../types/auth.token';
import { AUTH_EVENT } from './auth.actions';
import { AuthEvent } from './auth.actions';
import { AUTH_LOADER } from './auth.actions';
import { AuthLoader } from './auth.actions';
import { AUTH_LOGIN_START } from './auth.actions';
import { AuthLoginStart } from './auth.actions';
import { AUTH_LOGIN_COMPLETE } from './auth.actions';
import { AuthLoginComplete } from './auth.actions';
import { AUTH_LOGOUT } from './auth.actions';
import { AuthLogout } from './auth.actions';

/** @exports */
const title: string = 'Auth';
const samples: string = 'kuwas';
const samplea: AuthCredentials = new AuthCredentials(null, null);
const samplez: ApiResponse<AuthToken> = new ApiResponse(new AuthToken(null, null, 0));

TestSuite(title, 'AuthEvent', '', () => {
  TestAction<AuthEvent, StoreEvent>(AuthEvent, AUTH_EVENT, null);
});

TestSuite(title, 'AuthLoader', '', () => {
  TestAction<AuthLoader, boolean>(AuthLoader, AUTH_LOADER, true);
});

TestSuite(title, 'AuthLoginStart', '', () => {
  TestAction<AuthLoginStart, typeof samplea>(AuthLoginStart, AUTH_LOGIN_START, samplea);
});

TestSuite(title, 'AuthLoginComplete', '', () => {
  TestAction<AuthLoginComplete, typeof samplez>(AuthLoginComplete, AUTH_LOGIN_COMPLETE, samplez);
});

TestSuite(title, 'AuthLogout', '', () => {
  TestAction<AuthLogout, null>(AuthLogout, AUTH_LOGOUT, null);
});
