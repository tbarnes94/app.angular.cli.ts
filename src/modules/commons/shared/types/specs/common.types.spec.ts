import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { ObjectAny } from '../object.any';
import { ObjectBooleans } from '../object.booleans';
import { ObjectStrings } from '../object.strings';

describe('<Common>', () => {

  let outpt: ObjectAny
    | ObjectBooleans
    | ObjectStrings
  ;

  describe('CommonTypes', () => {
    it('should return response', fakeAsync(() => {
      outpt = new ObjectAny();
      outpt = new ObjectBooleans();
      outpt = new ObjectStrings();
    }));
  });

});
