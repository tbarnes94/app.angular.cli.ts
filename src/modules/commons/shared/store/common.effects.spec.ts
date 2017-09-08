import { TestBed } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { CommonAction } from './common.action';
import { CommonEffects as Effects } from './common.effects';

/** @tests */
describe('<Common>', () => {

  /** @param */
  let outpt: any;
  const value: string = 'kuwas';

  let effects: Effects;

  /** @before */
  beforeEach(() => {
    effects = new Effects(null, null, null);
  });

  /** @cases */
  describe('CommonEffects', () => {

    it('should return response for exception()', fakeAsync(() => {
      outpt = effects.exception({ message: value }, CommonAction);
      expect(outpt.payload).toEqual(value);
    }));

    it('should return response for exception() with default', fakeAsync(() => {
      outpt = effects.exception(null, CommonAction);
      expect(outpt.payload).toEqual('Error');
    }));

  });

});
