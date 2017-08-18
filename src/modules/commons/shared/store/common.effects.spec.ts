import { TestBed } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';

import { CommonEffects as Effects } from './common.effects';

describe('<Common>', () => {

  let effects: Effects;

  describe('CommonEffects', () => {
    it('should return response', fakeAsync(() => {
      effects = new Effects(null, null, null);
      expect(effects).toBeDefined();
    }));
  });

});
