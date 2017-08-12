import { ActionReducer } from '@ngrx/store';

import { immutable } from '../helpers/common.helpers';
import { CommonAction } from './common.action';

/**
 * https://github.com/ngrx/store
 */
export function commonReducer<S, A extends CommonAction<any>>(type: string, start: S = null): ActionReducer<S, A> {
  return function (state: S = start, action: A): S {
    if (action.type === type) {
      return immutable<S>(action.payload);
    }
    return state;
  };
}
