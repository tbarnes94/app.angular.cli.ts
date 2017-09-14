import { tick } from '@angular/core/testing';

import { CommonSuite } from '../../../specs/common.tests';
import { CommonAction } from '../common.action';
import { CommonEffects as Effects } from '../common.effects';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonEffects';
const effects: Effects = new Effects(null, null, null);
const samples: string = 'kuwas';

CommonSuite(title, subtitle, 'for exception()', () => {
  const outpt: any = effects.exception({ message: samples }, CommonAction);
  expect(outpt.payload).toEqual(samples);
});

CommonSuite(title, subtitle, 'for exception() with default', () => {
  const outpt: any = effects.exception(null, CommonAction);
  expect(outpt.payload).toEqual('Error');
});
