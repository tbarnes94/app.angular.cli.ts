import { ActionReducer } from '@ngrx/store';

import { CommonSuite } from '../../../specs/common.tests';
import { commonReducer as Reducer } from '../common.reducer';
import { CommonReducerTest } from './common.reducers.tests';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'commonReducer';

CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<boolean>(Reducer<boolean, any>(null), null);
});

CommonSuite(title, subtitle, 'for value', () => {
  CommonReducerTest<boolean>(Reducer<boolean, any>(null, true), true);
});

CommonSuite(title, subtitle, 'for default', () => {
  const action: any = { type: null, payload: null };
  const reducer: ActionReducer<boolean, any> = Reducer<boolean, any>(null);
  const state: boolean = reducer(null, action);
  expect(state).toBeNull();
});
