import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { CommonPreloadStrategy as Preload } from './common.preload.strategy';

describe('<Common>', () => {

  let service: Preload;
  let outpt: Observable<null> | boolean;

  describe('CommonPreloadStrategy', () => {

    it('should return response for preload() true', fakeAsync(() => {
      service = new Preload();
      outpt = service.preload({ data: { preload: true } }, () => true);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for preload() false', fakeAsync(() => {
      service.preload({ data: { preload: false } }, null).subscribe((o: null) => outpt = o); tick();
      expect(outpt).toBeNull();
    }));

  });

});
