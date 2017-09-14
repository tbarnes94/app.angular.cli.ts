import { tick } from '@angular/core/testing';

import { CommonSuite } from '../../../specs/common.tests';
import { error } from '../common.helpers';
import { immutable } from '../common.helpers';
import { isEmpty } from '../common.helpers';
import { isEmptyArray } from '../common.helpers';
import { isEmptyObject } from '../common.helpers';
import { isNotEmpty } from '../common.helpers';
import { isNotEmptyArray } from '../common.helpers';
import { isNotEmptyObject } from '../common.helpers';
import { isNotNullOrUndefined } from '../common.helpers';
import { isNullOrUndefined } from '../common.helpers';
import { CommonBooleanTest } from './common.helpers.tests';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonHelpers';

CommonSuite(title, subtitle, 'for isEmptyArray()', () => {
  CommonBooleanTest<Array<boolean>, boolean>(isEmptyArray, new Array(), true);
});

CommonSuite(title, subtitle, 'for isNotEmptyArray()', () => {
  CommonBooleanTest<Array<boolean>, boolean>(isNotEmptyArray, new Array(true), true);
});

CommonSuite(title, subtitle, 'for isEmptyObject()', () => {
  CommonBooleanTest<any, boolean>(isEmptyObject, {}, true);
});

CommonSuite(title, subtitle, 'for isNotEmptyObject()', () => {
  CommonBooleanTest<any, boolean>(isNotEmptyObject, { id: true }, true);
});

CommonSuite(title, subtitle, 'for isNullOrUndefined() for null', () => {
  CommonBooleanTest<null, boolean>(isNullOrUndefined, null, true);
});

CommonSuite(title, subtitle, 'for isNullOrUndefined() for undefined', () => {
  CommonBooleanTest<undefined, boolean>(isNullOrUndefined, undefined, true);
});

CommonSuite(title, subtitle, 'for isNotNullOrUndefined()', () => {
  CommonBooleanTest<any, boolean>(isNotNullOrUndefined, {}, true);
});

CommonSuite(title, subtitle, 'for isEmpty() for array', () => {
  CommonBooleanTest<Array<boolean>, boolean>(isEmpty, new Array(), true);
});

CommonSuite(title, subtitle, 'for isEmpty() for object', () => {
  CommonBooleanTest<any, boolean>(isEmpty, {}, true);
});

CommonSuite(title, subtitle, 'for isEmpty() for null', () => {
  CommonBooleanTest<null, boolean>(isEmpty, null, true);
});

CommonSuite(title, subtitle, 'for isNotEmpty() for array', () => {
  CommonBooleanTest<Array<boolean>, boolean>(isNotEmpty, new Array(true), true);
});

CommonSuite(title, subtitle, 'for isNotEmpty() for object', () => {
  CommonBooleanTest<any, boolean>(isNotEmpty, { id: true }, true);
});

CommonSuite(title, subtitle, 'for immutable() for array', () => {
  const input: any = new Array();
  const outpt: any = immutable(input);
  outpt.push(true);
  expect(input.length).toEqual(0);
  expect(outpt.length).toEqual(1);
});

CommonSuite(title, subtitle, 'for immutable() for primitives', () => {
  const input: any = true;
  const outpt: any = immutable(input);
  expect(input).toBeTruthy();
  expect(outpt).toBeTruthy();
});

CommonSuite(title, subtitle, 'for immutable() for object', () => {
  const input: any = { key: true };
  const outpt: any = immutable(input);
  outpt.key = false;
  expect(input.key).toBeTruthy();
  expect(outpt.key).toBeFalsy();
});

CommonSuite(title, subtitle, 'for error()', () => {
  let outpt: boolean;
  error(true).subscribe((o) => outpt = o);
  tick();
  expect(outpt).toBeTruthy();
});
