import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { CommonLoader } from '../common.actions';
import { CommonActions } from '../common.actions';
import { commonLoaderReducers } from '../common.reducers';
import { commonReducers as Reducers } from '../common.reducers';

describe('<Common>', () => {

  let state: any;
  let action: CommonActions;
  const value: boolean = true;

  describe('commonReducers', () => {
    it('should return response', fakeAsync(() => {
      state = Reducers({}, { type: null, payload: null });
    }));
  });

  describe('commonLoaderReducers', () => {

    it('should return response', fakeAsync(() => {
      state = commonLoaderReducers(null, { type: null, payload: null });
      expect(state).toBeNull();
    }));

    it('should return response for loader', fakeAsync(() => {
      action = new CommonLoader(value);
      state = commonLoaderReducers(undefined, action);
      expect(state).toEqual(value);
    }));

  });

});
