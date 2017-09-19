import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { CommonSuite } from '../../../../commons/specs/common.tests';
import { ApiOptions } from '../../types/api.options';
import { ApiService as Service } from '../api.service';

/** @exports */
let service: Service;
let request: TestRequest;
let http: HttpTestingController;

export function one(): void {

  TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    declarations: [],
    providers: [
      { provide: ApiOptions, useValue: {} },
      Service,
    ],
  });

  http = TestBed.get(HttpTestingController);
  service = TestBed.get(Service);

}

let outpt: any;
const title: string = 'Api';
const subtitle: string = 'ApiService';
const samples: string = 'kuwas';

CommonSuite(
  title,
  subtitle,
  'for headers()',
  () => {
    outpt = service.headers({ [ samples ]: samples });
    expect(outpt.get(samples)).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for error()',
  () => {
    const payload: HttpErrorResponse = new HttpErrorResponse({ error: `{ "message" : "${samples}" }` });
    service.error(payload).subscribe((o) => outpt = o);
    tick();
    expect(outpt.error.message).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for error() with error',
  () => {
    const payload: HttpErrorResponse = new HttpErrorResponse({ error: `{ "error" : "${samples}" }` });
    service.error(payload).subscribe((o) => outpt = o);
    tick();
    expect(outpt.error).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for error() with default',
  () => {
    const payload: HttpErrorResponse = new HttpErrorResponse({ status: 400, statusText: samples, error: {} });
    service.error(payload).subscribe((o) => outpt = o);
    tick();
    expect(outpt.error.message).toEqual(`400 ${samples}`);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for response()',
  () => {
    const payload: HttpResponse<string> = new HttpResponse<string>({ body: samples });
    outpt = service.response(payload);
    expect(outpt.content).toEqual(samples);
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for request()',
  () => {
    service
      .request(null, samples, 'GET', {}, null)
      .subscribe((o) => outpt = o)
    ;
    request = http.expectOne(`undefined/${samples}`);
    expect(request.request.body).toBeNull();
    expect(request.request.method).toEqual('GET');
    request.flush(null);
    tick();
    expect(outpt.content).toEqual('null');
    http.verify();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for request() with host and path',
  () => {
    service
      .request(samples, samples, 'GET', {}, samples)
      .subscribe((o) => outpt = o)
    ;
    request = http.expectOne(`${samples}/${samples}`);
    expect(request.request.body).toEqual(samples);
    expect(request.request.method).toEqual('GET');
    request.flush(samples);
    tick();
    expect(outpt.content).toEqual(samples);
    http.verify();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for request() with absolute path',
  () => {
    service
      .request(null, `/${samples}`, 'GET', {}, null)
      .subscribe((o) => outpt = o)
    ;
    request = http.expectOne(`/${samples}`);
    expect(request.request.body).toBeNull();
    expect(request.request.method).toEqual('GET');
    request.flush(null);
    tick();
    expect(outpt.content).toEqual('null');
    http.verify();
  },
  one,
);

CommonSuite(
  title,
  subtitle,
  'for request() with error',
  () => {
    service
      .request(null, samples, 'GET', {}, null)
      .subscribe((o) => outpt = o)
    ;
    request = http.expectOne(`undefined/${samples}`);
    expect(request.request.body).toBeNull();
    expect(request.request.method).toEqual('GET');
    request.error(new ErrorEvent(samples), { status: 401, statusText: 'Unauthorized' });
    tick();
    expect(outpt.error.message).toEqual('401 Unauthorized');
    http.verify();
  },
  one,
);
