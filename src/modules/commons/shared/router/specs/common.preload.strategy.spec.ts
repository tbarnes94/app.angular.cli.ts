import { tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { CommonSuite } from '../../../specs/common.tests';
import { CommonPreloadStrategy as Preload } from '../common.preload.strategy';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonPreloadStrategy';
const service: Preload = new Preload();

CommonSuite(title, subtitle, 'for preload() with true', () => {
  const outpt: any = service.preload({ data: { preload: true } }, () => true);
  expect(outpt).toBeTruthy();
});

CommonSuite(title, subtitle, 'for preload() with false', () => {
  let outpt: null;
  service.preload({ data: { preload: false } }, null).subscribe((o: null) => outpt = o);
  tick();
  expect(outpt).toBeNull();
});
