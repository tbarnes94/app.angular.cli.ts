import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { COMMON_LOADER } from './common.actions';
import { CommonLoader } from './common.actions';
import { CommonActions } from './common.actions';
import { commonReducer } from './common.reducer';

/**
 * https://github.com/ngrx/platform
 */
export const commonLoaderReducer: ActionReducer<boolean, CommonLoader> = commonReducer<boolean, CommonLoader>(COMMON_LOADER, true);

/**
 * https://github.com/ngrx/platform
 */
export function commonReducers(state: any, action: CommonActions): any {
  return combineReducers({
    loader: commonLoaderReducer,
  })(state, action);
}
