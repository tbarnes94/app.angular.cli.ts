import { ApiResponse } from '../../../../../modules/api';
import { CommonActionTest } from '../../../../../modules/commons/shared/store/specs/common.actions.tests';
import { CommonSuite } from '../../../../../modules/commons/specs/common.tests';
import { AuthCredentials } from '../../types/auth.credentials';
import { AuthToken } from '../../types/auth.token';
import { AUTH_ERROR } from '../auth.actions';
import { AuthError } from '../auth.actions';
import { AUTH_LOADER } from '../auth.actions';
import { AuthLoader } from '../auth.actions';
import { AUTH_LOGIN_START } from '../auth.actions';
import { AuthLoginStart } from '../auth.actions';
import { AUTH_LOGIN_COMPLETE } from '../auth.actions';
import { AuthLoginComplete } from '../auth.actions';
import { AUTH_LOGOUT } from '../auth.actions';
import { AuthLogout } from '../auth.actions';

/** @exports */
const title: string = 'Auth';
const samples: string = 'kuwas';
const samplea: AuthCredentials = new AuthCredentials(null, null);
const samplez: ApiResponse<AuthToken> = new ApiResponse(new AuthToken(null, null, 0));

CommonSuite(title, 'AuthError', '', () => {
  CommonActionTest<AuthError, typeof samples>(AuthError, AUTH_ERROR, samples);
});

CommonSuite(title, 'AuthLoader', '', () => {
  CommonActionTest<AuthLoader, boolean>(AuthLoader, AUTH_LOADER, true);
});

CommonSuite(title, 'AuthLoginStart', '', () => {
  CommonActionTest<AuthLoginStart, typeof samplea>(AuthLoginStart, AUTH_LOGIN_START, samplea);
});

CommonSuite(title, 'AuthLoginComplete', '', () => {
  CommonActionTest<AuthLoginComplete, typeof samplez>(AuthLoginComplete, AUTH_LOGIN_COMPLETE, samplez);
});

CommonSuite(title, 'AuthLogout', '', () => {
  CommonActionTest<AuthLogout, null>(AuthLogout, AUTH_LOGOUT, null);
});
