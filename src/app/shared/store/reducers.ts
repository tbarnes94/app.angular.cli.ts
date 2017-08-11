import { routerReducer } from '@ngrx/router-store';
import { ActionReducer } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

/**
 * https://github.com/ngrx/store
 */
export const metaReducers: Array<ActionReducer<any>> = [
];

export const reducers: ActionReducerMap<any> = {
  // router : routerReducer ,
};
