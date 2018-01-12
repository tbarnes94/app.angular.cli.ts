import { CommonActionsTypes } from '@kuwas/angular';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducer } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';
import { MetaReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

/**
 * https://github.com/ngrx/platform
 */
export const options: any = {
  key: 'app.angular.cli.ts',
  payload: {
    auth: { token: 'string' },
    translate: { language: 'string' },
  },
};

/**
 * https://github.com/ngrx/platform
 */
export function reads(schemas: any, state: string = null): any {

  try {
    const input: string = localStorage.getItem(schemas.key);
    const outpt: any = JSON.parse(input);
    return outpt;
  } catch (e) {
    return state;
  }

}

/**
 * https://github.com/ngrx/platform
 */
export function build(nodes: any, state: any = null): any {

  const outpt: any = {};
  if (!state) {
    return outpt;
  }
  Object.keys(nodes).forEach((k) => {
    if (state[ k ]) {
      outpt[ k ] = ( typeof nodes[ k ] === 'object' )
        ? build(nodes[ k ], state[ k ])
        : state[ k ]
      ;
    }
  });

  return outpt;

}

/**
 * https://github.com/ngrx/platform
 */
export function write(schemas: any, state: any = null): any {
  const outpt: any = build(schemas.payload, state);
  const payload: string = JSON.stringify(outpt);
  localStorage.setItem(schemas.key, payload);
  return outpt;
}

/**
 * https://github.com/ngrx/platform
 */
export function storage(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    state = reducer(state, action);
    write(options, state);
    return state;
  };
}

/**
 * https://github.com/ngrx/platform
 */
export function clear(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    return ( action.type === CommonActionsTypes.Reset as string )
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
