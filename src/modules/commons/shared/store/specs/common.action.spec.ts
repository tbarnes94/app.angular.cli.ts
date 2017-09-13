import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { CommonAction as Action } from '../common.action';

describe('<Common>', () => {

  let action: Action<boolean>;

  describe('CommonAction', () => {
    it('should return response', fakeAsync(() => {
      action = new Action<boolean>(true);
      expect(action.payload).toBeTruthy();
    }));
  });

});
