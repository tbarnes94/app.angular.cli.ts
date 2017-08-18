import { MocksRouter } from '../../../../mocks/router';
import { MocksStore } from '../../../../mocks/store';

import { TestBed } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { NavigationCancel } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { NavigationError } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { ObjectAny } from '../types/object.any';
import { CommonService as Service } from './common.service';

describe('<Common>', () => {

  let spy: any;
  let outpt: any;
  const value: string = 'kuwas';

  let service: Service;
  let router: MocksRouter<ObjectAny>;
  let store: MocksStore<boolean | string>;
  let filters: Observable<Array<Function>>
    | Array<Function>
  ;

  beforeEach(() => {
    spy = {
      callback: (input) => input
    };
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
    spyOn(spy, 'callback');

  });

  describe('CommonService', () => {

    it('should return response for dispatch()', fakeAsync(() => {
      store.select().subscribe((o) => outpt = o);
      service.dispatch({ type: null, payload: value }); tick();
      expect(outpt).toEqual(value);
    }));

    it('should return response for select() zero depth', fakeAsync(() => {
      service.select<string>([]).subscribe((o) => outpt = o);
      expect(outpt).toBeNull();
    }));

    it('should return response for select() one depth', fakeAsync(() => {
      service.select<string>([ value ]).subscribe((o) => outpt = o);
      service.dispatch({ type: null, payload: value }); tick();
      expect(outpt).toEqual(value);
    }));

    it('should return response for select() two depth', fakeAsync(() => {
      service.select<string>([ value, value ]).subscribe((o) => outpt = o);
      service.dispatch({ type: null, payload: value }); tick();
      expect(outpt).toEqual(value);
    }));

    it('should return response for select() three depth', fakeAsync(() => {
      service.select<string>([ value, value, value ]).subscribe((o) => outpt = o);
      service.dispatch({ type: null, payload: value }); tick();
      expect(outpt).toEqual(value);
    }));

    it('should return response for select() filtered with array', fakeAsync(() => {
      filters = [ (o) => { spy.callback(true); return true; } ];
      service.select<string>([ value ], filters).subscribe((o) => outpt = o);
      service.dispatch({ type: null, payload: value }); tick();
      expect(spy.callback).toHaveBeenCalledWith(true);
    }));

    it('should return response for select() filtered with observable', fakeAsync(() => {
      filters = Observable.of([ (o) => { spy.callback(true); return true; } ]);
      service.select<string>([ value ], filters).subscribe((o) => outpt = o);
      service.dispatch({ type: null, payload: value }); tick();
      expect(spy.callback).toHaveBeenCalledWith(true);
    }));

    it('should return response for select() with context', fakeAsync(() => {
      filters = [ function (o: string): boolean { spy.callback(null); return true; } ];
      service.select<string>([ value ], filters, null).subscribe((o) => outpt = o);
      service.dispatch({ type: null, payload: value }); tick();
      expect(spy.callback).toHaveBeenCalledWith(null);
    }));

    it('should return response for redirect() with options', fakeAsync(() => {
      router.routes.subscribe((o) => outpt = o);
      service.redirect([ value ], {}); tick();
      expect(outpt[ 0 ]).toEqual(value);
    }));

    it('should return response for redirect()', fakeAsync(() => {
      router.routes.subscribe((o) => outpt = o);
      service.redirect([ value ]); tick();
      expect(outpt[ 0 ]).toEqual(value);
    }));

    it('should return response for loads() with delay', fakeAsync(() => {
      store.select().subscribe((o) => outpt = o);
      service.loader(true, 500); tick(1000);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for loads()', fakeAsync(() => {
      store.select().subscribe((o) => outpt = o);
      service.loader(true); tick();
      expect(outpt).toBeTruthy();
    }));

  });

  describe('CommonService.subscribe', () => {

    it('should return response for NavigationStart event', fakeAsync(() => {
      store.select().subscribe((o) => outpt = o);
      router.dispatch(new NavigationStart(1, value)); tick(1000);
      expect(outpt).toBeTruthy();
    }));

    it('should return response for NavigationCancel event', fakeAsync(() => {
      store.select().subscribe((o) => outpt = o);
      router.dispatch(new NavigationCancel(1, value, value)); tick(1000);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for NavigationError event', fakeAsync(() => {
      store.select().subscribe((o) => outpt = o);
      router.dispatch(new NavigationError(1, value, value)); tick(1000);
      expect(outpt).toBeFalsy();
    }));

    it('should return response for NavigationEnd event', fakeAsync(() => {
      store.select().subscribe((o) => outpt = o);
      router.dispatch(new NavigationEnd(1, value, value)); tick(1000);
      expect(outpt).toBeFalsy();
    }));

  });

});
