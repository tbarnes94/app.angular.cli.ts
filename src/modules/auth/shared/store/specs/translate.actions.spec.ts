import { CommonActionTest } from '../../../../commons/shared/store/specs/common.actions.tests';
import { CommonSuite } from '../../../../commons/specs/common.tests';
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

CommonSuite(title, 'AuthError', '', () => {
  CommonActionTest<AuthError, string>(AuthError, AUTH_ERROR, samples);
});

CommonSuite(title, 'AuthLoader', '', () => {
  CommonActionTest<AuthLoader, boolean>(AuthLoader, AUTH_LOADER, true);
});

CommonSuite(title, 'AuthLoginStart', '', () => {
  CommonActionTest<AuthLoginStart, AuthCredentials>(AuthLoginStart, AUTH_LOGIN_START, new AuthCredentials(null, null));
});

CommonSuite(title, 'AuthLoginComplete', '', () => {
  CommonActionTest<AuthLoginComplete, AuthToken>(AuthLoginComplete, AUTH_LOGIN_COMPLETE, new AuthToken(null, null, 0));
});

CommonSuite(title, 'AuthLogout', '', () => {
  CommonActionTest<AuthLogout, null>(AuthLogout, AUTH_LOGOUT, null);
});
