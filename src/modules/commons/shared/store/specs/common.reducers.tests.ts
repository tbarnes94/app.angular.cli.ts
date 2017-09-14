import { tick } from '@angular/core/testing';
import { ActionReducer } from '@ngrx/store';

import { CommonAction } from '../common.action';

/** @exports */
export function CommonReducerTest<S>(Reducer: any, results: S): void {
  const state: S = Reducer(undefined, { type: undefined, payload: undefined });
  expect(state).toEqual(results);
}

/** @exports */
export function CommonReducerActionTest<A extends CommonAction<P>, P, S>(Action: any, Reducer: ActionReducer<S, A>, payload: P, results: S): void {
  const action: A = new Action(payload);
  const state: S = Reducer(undefined, action);
  expect(state).toEqual(results);
}