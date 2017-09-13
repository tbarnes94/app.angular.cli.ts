import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { commonReducer as Reducer } from '../common.reducer';

describe('<Common>', () => {

  let state: null;
  let reducer: Function;
  const value: string = 'kuwas';

  describe('commonReducer', () => {

    it('should return response', fakeAsync(() => {
      reducer = Reducer<string, any>(value);
      state = reducer(undefined, { type: null, payload: null });
      expect(state).toBeNull();
    }));

    it('should return response for value', fakeAsync(() => {
      reducer = Reducer<string, any>(value, value);
      state = reducer(null, { type: value, payload: value });
      expect(state).toEqual(value);
    }));

  });

});
