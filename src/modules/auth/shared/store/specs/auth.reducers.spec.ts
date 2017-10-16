import { ApiResponse } from '../../../../api';
import { CommonReducerActionTest } from '../../../../commons/shared/store/specs/common.reducers.tests';
import { CommonReducerTest } from '../../../../commons/shared/store/specs/common.reducers.tests';
import { CommonSuite } from '../../../../commons/specs/common.tests';
import { AuthToken } from '../../types/auth.token';
import { AuthError } from '../auth.actions';
import { AuthLoader } from '../auth.actions';
import { AuthLoginComplete } from '../auth.actions';
import { authErrorReducer } from '../auth.reducers';
import { authLoaderReducer } from '../auth.reducers';
import { authTokenReducer } from '../auth.reducers';
import { authReducers as reducers } from '../auth.reducers';

/** @exports */
const title: string = 'Auth';
let subtitle: string = 'authReducers';
const samples: string = 'kuwas';

CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<any>(reducers, { error: null, loader: false, token: null });
});

subtitle = 'authErrorReducer';
CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<string>(authErrorReducer, null);
});

CommonSuite(title, subtitle, 'for error', () => {
  CommonReducerActionTest<AuthError, string, string>(AuthError, authErrorReducer, samples, samples);
});

subtitle = 'authLoaderReducer';
CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<boolean>(authLoaderReducer, false);
});

CommonSuite(title, subtitle, 'for loader', () => {
  CommonReducerActionTest<AuthLoader, boolean, boolean>(AuthLoader, authLoaderReducer, true, true);
});

subtitle = 'authTokenReducer';
CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<ApiResponse<AuthToken>>(authTokenReducer, null);
});

CommonSuite(title, subtitle, 'for complete', () => {
  CommonReducerActionTest<AuthLoginComplete, ApiResponse<AuthToken>, ApiResponse<AuthToken>>(AuthLoginComplete, authTokenReducer, new ApiResponse(new AuthToken(null, null, 0)), new ApiResponse(new AuthToken(null, null, 0)));
});
