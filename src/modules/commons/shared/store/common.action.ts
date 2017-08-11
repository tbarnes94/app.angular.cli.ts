import { Action } from '@ngrx/store';

/**
 * https://github.com/ngrx/store
 */
export class CommonAction<T> implements Action {
  public readonly type: string;
  public constructor(public payload: T) {
  }
}
