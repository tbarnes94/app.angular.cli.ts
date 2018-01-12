import { ApiResponse } from '@kuwas/angular';
import { StoreEvent } from '@kuwas/angular';

import { TestReducer } from '../../../../modules/tests/test.reducer.tests';
import { TestReducerAction } from '../../../../modules/tests/test.reducer.tests';
import { TestSuite } from '../../../../modules/tests/test.suite.tests';
import { AuthToken } from '../types/auth.token';
import { AuthEvent } from './auth.actions';
import { AuthLoader } from './auth.actions';
import { AuthLoginComplete } from './auth.actions';
import { authEventReducer } from './auth.reducers';
import { authLoaderReducer } from './auth.reducers';
import { authTokenReducer } from './auth.reducers';
import { authReducers as reducers } from './auth.reducers';

/** @exports */
const title: string = 'Auth';
let subtitle: string = 'authReducers';
const samples: string = 'kuwas';
const samplez: ApiResponse<AuthToken> = new ApiResponse(new AuthToken(null, null, 0));

TestSuite(title, subtitle, '', () => {
  TestReducer<any>(
    reducers, {
      event: null,
      loader: false,
      token: null,
    },
  );
});

subtitle = 'authEventReducer';
TestSuite(title, subtitle, '', () => {
  TestReducer<StoreEvent>(authEventReducer, null);
});

TestSuite(title, subtitle, 'for event', () => {
  TestReducerAction<AuthEvent, StoreEvent, StoreEvent>(AuthEvent, authEventReducer, null, null);
});

subtitle = 'authLoaderReducer';
TestSuite(title, subtitle, '', () => {
  TestReducer<boolean>(authLoaderReducer, false);
});

TestSuite(title, subtitle, 'for loader', () => {
  TestReducerAction<AuthLoader, boolean, boolean>(AuthLoader, authLoaderReducer, true, true);
});

subtitle = 'authTokenReducer';
TestSuite(title, subtitle, '', () => {
  TestReducer<typeof samplez>(authTokenReducer, null);
});

TestSuite(title, subtitle, 'for complete', () => {
  TestReducerAction<AuthLoginComplete, typeof samplez, typeof samplez>(AuthLoginComplete, authTokenReducer, samplez, samplez);
});
