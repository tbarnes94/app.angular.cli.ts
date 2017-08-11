import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { COMMON_LOADER } from './common.actions';
import { CommonLoader } from './common.actions';
import { CommonActions } from './common.actions';
import { CommonReducer } from './common.reducer';

/**
 * https://github.com/ngrx/store
 */
export const CommonLoaderReducers: ActionReducer<boolean, CommonLoader> = CommonReducer<boolean, CommonLoader>(COMMON_LOADER, true);

/**
 * https://github.com/ngrx/store
 */
export function CommonReducers(state: any, action: CommonActions): any {
  return combineReducers({
    loader: CommonLoaderReducers,
  })(state, action);
}
