import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { CommonPipe as Pipe } from './common.pipe';

/** @tests */
describe('<Common>', () => {

  /** @param */
  let pipe: Pipe;
  let outpt: boolean;

  /** @cases */
  describe('CommonPipe', () => {
    it('should return response for transform()', fakeAsync(() => {
      pipe = new Pipe(null);
      outpt = pipe.transform(true, true);
      expect(outpt).toBeTruthy();
    }));
  });

});
