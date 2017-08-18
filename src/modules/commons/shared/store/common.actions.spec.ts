import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { COMMON_LOADER } from './common.actions';
import { CommonLoader } from './common.actions';
import { CommonActions } from './common.actions';

describe('<Common>', () => {

  let action: CommonActions;
  const value: boolean = true;

  describe('CommonLoader', () => {
    it('should return response', fakeAsync(() => {
      action = new CommonLoader(value);
      expect(action.type).toEqual(COMMON_LOADER);
      expect(action.payload).toEqual(value);
    }));
  });

});
