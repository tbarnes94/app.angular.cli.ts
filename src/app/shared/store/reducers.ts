import { routerReducer } from '@ngrx/router-store';
import { ActionReducer } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';
import { MetaReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { AUTH_LOGOUT } from '../../../modules/auth';

/**
 * https://github.com/ngrx/platform
 */
export const local: any = {
  key: 'app.angular.cli.ts',
  payload: {
    auth: { token: 'string' },
    translate: { language: 'string' },
  },
};

/**
 * https://github.com/ngrx/platform
 */
export function parse(payload: any, state: any): any {

  const outpt: any = {};
  const keys: Array<string> = Object.keys(payload);
  if (!state) {
    return outpt;
  }

  keys.forEach((k) => {
    if (state[ k ]) {
      outpt[ k ] = ( typeof payload[ k ] === 'object' )
        ? parse(payload[ k ], state[ k ])
        : state[ k ]
      ;
    }
  });

  return outpt;

}

/**
 * https://github.com/ngrx/platform
 */
export function storage(reducer: ActionReducer<any>): ActionReducer<any> {

  return (state: any, action: any): any => {

    let payload: any;
    state = reducer(state, action);

    if (action.type === '@ngrx/store/init') {
      payload = localStorage.getItem(local.key);
      payload = ( payload ) ? JSON.parse(payload) : state;
      payload = ( payload ) ? Object.assign(state, payload) : state;
      return reducer(payload, action);
    }

    payload = parse(local.payload, state);
    localStorage.setItem(local.key, JSON.stringify(payload));
    return state;

  };

}

/**
 * https://github.com/ngrx/platform
 */
export function clear(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    return (action.type === AUTH_LOGOUT)
      ? reducer({ common: state.common, translate: state.translate }, action)
      : reducer(state, action)
      ;
  };
}

/**
 * https://github.com/ngrx/platform
 */
export const metaReducers: Array<MetaReducer<any>> = [
  storage,
  clear,
];

/**
 * https://github.com/ngrx/platform
 */
export const reducers: ActionReducerMap<any> = {
  // router : routerReducer ,
};
