import { TestBed } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { error } from './common.helpers';
import { immutable } from './common.helpers';
import { isEmpty } from './common.helpers';
import { isEmptyArray } from './common.helpers';
import { isEmptyObject } from './common.helpers';
import { isNotEmpty } from './common.helpers';
import { isNotEmptyArray } from './common.helpers';
import { isNotEmptyObject } from './common.helpers';
import { isNotNullOrUndefined } from './common.helpers';
import { isNullOrUndefined } from './common.helpers';
import { print } from './common.helpers';

describe('<Common>', () => {

  let input: any;
  let outpt: any;

  describe('isEmptyArray', () => {
    it('should return response', fakeAsync(() => {
      outpt = isEmptyArray([]);
      expect(outpt).toBeTruthy();
    }));
  });

  describe('isNotEmptyArray', () => {
    it('should return response', fakeAsync(() => {
      outpt = isNotEmptyArray([ true ]);
      expect(outpt).toBeTruthy();
    }));
  });

  describe('isEmptyObject', () => {
    it('should return response', fakeAsync(() => {
      outpt = isEmptyObject({});
      expect(outpt).toBeTruthy();
    }));
  });

  describe('isNotEmptyObject', () => {
    it('should return response', fakeAsync(() => {
      outpt = isNotEmptyObject({ id: true });
      expect(outpt).toBeTruthy();
    }));
  });

  describe('isNullOrUndefined', () => {

    it('should return response for null', fakeAsync(() => {
      outpt = isNullOrUndefined(null);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for undefined', fakeAsync(() => {
      outpt = isNullOrUndefined(undefined);
      expect(outpt).toBeTruthy();
    }));

  });

  describe('isNotNullOrUndefined', () => {
    it('should return response', fakeAsync(() => {
      outpt = isNotNullOrUndefined({});
      expect(outpt).toBeTruthy();
    }));
  });

  describe('isEmpty', () => {

    it('should return response for array', fakeAsync(() => {
      outpt = isEmpty([]);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for object', fakeAsync(() => {
      outpt = isEmpty({});
      expect(outpt).toBeTruthy();
    }));

    it('should return response for null', fakeAsync(() => {
      outpt = isEmpty(null);
      expect(outpt).toBeTruthy();
    }));

  });

  describe('isNotEmpty', () => {

    it('should return response for array', fakeAsync(() => {
      outpt = isNotEmpty([ true ]);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for object', fakeAsync(() => {
      outpt = isNotEmpty({ id: true });
      expect(outpt).toBeTruthy();
    }));

  });

  describe('immutable', () => {

    it('should return response for array', fakeAsync(() => {
      input = new Array();
      outpt = immutable(input);
      outpt.push(true);
      expect(outpt.length).toEqual(1);
      expect(input.length).toEqual(0);
    }));

    it('should return response for primitives', fakeAsync(() => {
      input = true;
      outpt = immutable(input);
      expect(input).toBeTruthy();
    }));

    it('should return response for object', fakeAsync(() => {
      input = { key: true };
      outpt = immutable(input);
      outpt.key = false;
      expect(outpt.key).toBeFalsy();
      expect(input.key).toBeTruthy();
    }));

  });

  describe('error', () => {
    it('should return response', fakeAsync(() => {
      error(true).subscribe((o) => outpt = o); tick();
      expect(input).toBeTruthy();
    }));
  });

  describe('print', () => {
    it('should return response', fakeAsync(() => {
      outpt = print(null, true);
    }));
  });

});
