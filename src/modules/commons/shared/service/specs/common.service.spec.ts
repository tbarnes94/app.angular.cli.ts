import { TestBed } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { NavigationCancel } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { NavigationError } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';

import { MocksRouter } from '../../../../../mocks/router';
import { MocksStore } from '../../../../../mocks/store';
import { CommonSuite } from '../../../specs/common.tests';
import { ObjectAny } from '../../types/object.any';
import { CommonService as Service } from '../common.service';

/** @exports */
let service: Service;
let router: MocksRouter<ObjectAny>;
let store: MocksStore<boolean | string>;

const spy: any = {
  cback: (input) => input
};
let filters: Observable<Array<Function>> | Array<Function>;

export function one(): void {

  router = new MocksRouter<ObjectAny>();
  store = new MocksStore<boolean | string>();
  TestBed.configureTestingModule({
    imports: [],
    declarations: [],
    providers: [
      { provide: Store, useValue: store },
      { provide: Router, useValue: router },
      Service,
    ],
  });

  service = TestBed.get(Service);
  spyOn(spy, 'cback');

}

let outpt: any;
const title: string = 'Common';
const subtitle: string = 'CommonService';
const samples: string = 'kuwas';

CommonSuite(
  title,
  subtitle,
  'for dispatch()',
  () => {
    store.select().subscribe((o) => outpt = o);
    service.dispatch({ type: null, payload: samples });
    tick();
    expect(outpt).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for select() zero depth',
  () => {
    service.select<string>([]).subscribe((o) => outpt = o);
    expect(outpt).toBeNull();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for select() one depth',
  () => {
    service.select<string>([ samples ]).subscribe((o) => outpt = o);
    service.dispatch({ type: null, payload: samples });
    tick();
    expect(outpt).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for select() two depth',
  () => {
    service.select<string>([ samples, samples ]).subscribe((o) => outpt = o);
    service.dispatch({ type: null, payload: samples });
    tick();
    expect(outpt).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for select() three depth',
  () => {
    service.select<string>([ samples, samples, samples ]).subscribe((o) => outpt = o);
    service.dispatch({ type: null, payload: samples });
    tick();
    expect(outpt).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for select() filtered with array',
  () => {
    filters = [ (o) => {
      spy.cback(true);
      return true;
    } ];
    service.select<string>([ samples ], filters).subscribe((o) => outpt = o);
    service.dispatch({ type: null, payload: samples });
    tick();
    expect(spy.cback).toHaveBeenCalledWith(true);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for select() filtered with observable',
  () => {
    filters = Observable.of([ (o) => {
      spy.cback(true);
      return true;
    } ]);
    service.select<string>([ samples ], filters).subscribe((o) => outpt = o);
    service.dispatch({ type: null, payload: samples });
    tick();
    expect(spy.cback).toHaveBeenCalledWith(true);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for select() with context',
  () => {
    filters = [ function (o: string): boolean {
      spy.cback(null);
      return true;
    } ];
    service.select<string>([ samples ], filters, null).subscribe((o) => outpt = o);
    service.dispatch({ type: null, payload: samples });
    tick();
    expect(spy.cback).toHaveBeenCalledWith(null);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for redirect() with options',
  () => {
    router.routes.subscribe((o) => outpt = o);
    service.redirect([ samples ], {});
    tick();
    expect(outpt[ 0 ]).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for redirect()',
  () => {
    router.routes.subscribe((o) => outpt = o);
    service.redirect([ samples ]);
    tick();
    expect(outpt[ 0 ]).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for loads() with delay',
  () => {
    store.select().subscribe((o) => outpt = o);
    service.loader(true, 500);
    tick(1000);
    expect(outpt).toBeTruthy();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for loads()',
  () => {
    store.select().subscribe((o) => outpt = o);
    service.loader(true);
    tick();
    expect(outpt).toBeTruthy();
  },
  one,
);

CommonSuite(
  title,
  `${subtitle}$`,
  'for NavigationStart event',
  () => {
    store.select().subscribe((o) => outpt = o);
    router.dispatch(new NavigationStart(1, samples));
    tick(1000);
    expect(outpt).toBeTruthy();
  },
  one,
);

CommonSuite(
  title,
  `${subtitle}$`,
  'for NavigationCancel event',
  () => {
    store.select().subscribe((o) => outpt = o);
    router.dispatch(new NavigationCancel(1, samples, samples));
    tick(1000);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  `${subtitle}$`,
  'for NavigationError event',
  () => {
    store.select().subscribe((o) => outpt = o);
    router.dispatch(new NavigationError(1, samples, samples));
    tick(1000);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  `${subtitle}$`,
  'for NavigationEnd event',
  () => {
    store.select().subscribe((o) => outpt = o);
    router.dispatch(new NavigationEnd(1, samples, samples));
    tick(1000);
    expect(outpt).toBeFalsy();
  },
  one,
);

CommonSuite(
  title,
  `${subtitle}$`,
  'for resizes$ event',
  () => {
    const subscribe: Subscription = service.resize$.subscribe((o) => outpt = o);
    window.dispatchEvent(new Event('resize'));
    tick(1000);
    expect(outpt).toBeGreaterThan(0);
    subscribe.unsubscribe();
  },
  one,
);

CommonSuite(
  title,
  `${subtitle}$`,
  'for width$ event',
  () => {
    service.width$.subscribe((o) => outpt = o);
    tick();
    expect(outpt).toBeGreaterThan(0);
  },
  one,
);
