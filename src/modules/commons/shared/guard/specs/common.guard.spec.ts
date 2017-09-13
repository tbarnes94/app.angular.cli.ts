import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { CommonGuard as Guard } from '../common.guard';

describe('<Common>', () => {

  let guard: Guard;
  let outpt: boolean;

  describe('CommonGuard', () => {
    it('should return response for canActivate()', fakeAsync(() => {
      guard = new Guard(null);
      guard.canActivate().subscribe((o) => outpt = o); tick();
      expect(outpt).toBeFalsy();
    }));
  });

});
