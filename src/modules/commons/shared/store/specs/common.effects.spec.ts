import { HttpErrorResponse } from '@angular/common/http';
import { tick } from '@angular/core/testing';

import { ApiError } from '../../../../api';
import { ApiErrorContent } from '../../../../api';
import { CommonSuite } from '../../../specs/common.tests';
import { CommonAction } from '../common.action';
import { CommonEffects as Effects } from '../common.effects';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonEffects';
const effects: Effects = new Effects(null, null, null);
const samples: string = 'kuwas';

CommonSuite(title, subtitle, 'for exception()', () => {
  const response: HttpErrorResponse = new HttpErrorResponse({});
  const content: ApiErrorContent = new ApiErrorContent(samples);
  const input: ApiError = new ApiError(response, content);
  const outpt: CommonAction<string> = effects.exception(input, CommonAction);
  expect(outpt.payload).toEqual(samples);
});

CommonSuite(title, subtitle, 'for exception() with default', () => {
  const outpt: CommonAction<string> = effects.exception(null, CommonAction);
  expect(outpt.payload).toEqual('Error');
});
