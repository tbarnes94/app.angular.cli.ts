import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

import { MocksRouter } from '../../../../../mocks/router';
import { MocksStore } from '../../../../../mocks/store';
import { ApiService } from '../../../../api/shared/service/api.service';
import { ApiError } from '../../../../api/shared/types/api.error';
import { ApiErrorContent } from '../../../../api/shared/types/api.error.content';
import { ApiResponse } from '../../../../api/shared/types/api.response';
import { CommonSuite } from '../../../specs/common.tests';
import { CommonService } from '../../service/common.service';
import { ObjectAny } from '../../types/object.any';
import { CommonLoader } from '../common.actions';
import { COMMON_ERROR } from '../common.actions';
import { CommonError } from '../common.actions';
import { COMMON_COMPLETE } from '../common.actions';
import { CommonComplete } from '../common.actions';
import { CommonActions } from '../common.actions';
import { CommonEffects as Effects } from '../common.effects';

/** @exports */
let effects: Effects;
let router: MocksRouter<ObjectAny>;
let store: MocksStore<boolean | string>;
let actions: Subject<any>;

export function one(): void {
  TestBed.configureTestingModule({
    imports: [],
    declarations: [],
    providers: [
      provideMockActions(() => actions),
      { provide: Router, useValue: new MocksRouter<ObjectAny>() },
      { provide: Store, useValue: new MocksStore<boolean | string>() },
      { provide: ApiService, useValue: {} },
      CommonService,
      Effects,
    ],
  });

  effects = TestBed.get(Effects);
  router = TestBed.get(Router);
  store = TestBed.get(Store);
  actions = new Subject<any>();

}

let outpt: any;
const title: string = 'Common';
const subtitle: string = 'CommonEffects';
const samples: string = 'kuwas';

CommonSuite(
  title,
  subtitle,
  'for build$()',
  () => {
    const cback: Function = (o) => Observable.of(new ApiResponse<string>(null, o));
    effects
      .build$<CommonActions, CommonLoader, CommonError, CommonComplete, ApiResponse<string>>
      (samples, CommonLoader, CommonError, CommonComplete, cback)
      .subscribe((o) => outpt = o)
    ;
    actions.next({ type: samples, payload: samples });
    tick(3000);
    expect(outpt.type).toEqual(COMMON_COMPLETE);
    expect(outpt.payload).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for build$() with error',
  () => {
    const cback: Function = (o) => Observable.of(new ApiError(null, { message: o }));
    effects
      .build$<CommonActions, CommonLoader, CommonError, CommonComplete, ApiError>
      (samples, CommonLoader, CommonError, CommonComplete, cback)
      .subscribe((o) => outpt = o)
    ;
    actions.next({ type: samples, payload: samples });
    tick(3000);
    expect(outpt.type).toEqual(COMMON_ERROR);
    expect(outpt.payload).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for exception()',
  () => {
    const response: HttpErrorResponse = new HttpErrorResponse({});
    const content: ApiErrorContent = new ApiErrorContent(samples);
    const input: ApiError = new ApiError(response, content);
    outpt = effects.exception(input, CommonError);
    expect(outpt.payload).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for exception() with default',
  () => {
    outpt = effects.exception(null, CommonError);
    expect(outpt.payload).toEqual('Error');
  },
  one,
);
