import { ActionReducer } from '@ngrx/store';
import { clone } from 'lodash';

import { CommonAction } from './common.action';

/**
 * https://github.com/ngrx/store
 */
export function CommonReducer<S, A extends CommonAction<any>>(type: string, start: S = null): ActionReducer<S, A> {
  return function (state: S = start, action: A): S {
    if (action.type === type) {
      return clone(action.payload);
    }
    return state;
  };
}
