import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { ApiOptions } from '../../types/api.options';
import { ApiService as Service } from '../api.service';

describe('<Api>', () => {

  let outpt: any;
  let payload: any;
  const root: string = '/api';
  const value: string = 'kuwas';
  let request: TestRequest;

  let http: HttpTestingController;
  let service: Service;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [],
      providers: [
        { provide: ApiOptions, useValue: { root } },
        Service,
      ],
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(Service);

  });

  describe('ApiService', () => {

    it('should return response for headers()', fakeAsync(() => {
      outpt = service.headers({ [ value ]: value });
      expect(outpt.get(value)).toEqual(value);
    }));

    it('should return response for error()', fakeAsync(() => {
      payload = new HttpErrorResponse({ error: { message: value } });
      service.error(payload).subscribe((o) => outpt = o); tick();
      expect(outpt.error.message).toEqual(value);
    }));

    it('should return response for response()', fakeAsync(() => {
      payload = new HttpResponse<string>({ body: value });
      outpt = service.response(payload);
      expect(outpt.content).toEqual(value);
    }));

    it('should return response for request()', fakeAsync(() => {
      service
        .request(null, value, 'GET', {}, null)
        .subscribe((o) => outpt = o)
      ;
      request = http.expectOne(`${root}/${value}`);
      expect(request.request.body).toBeNull();
      expect(request.request.method).toEqual('GET');
      request.flush(null); tick();
      expect(outpt.content).toEqual('null');
      http.verify();
    }));

    it('should return response for request() with host and path', fakeAsync(() => {
      service
        .request(value, value, 'GET', {}, value)
        .subscribe((o) => outpt = o)
      ;
      request = http.expectOne(`${value}/${value}`);
      expect(request.request.body).toEqual(value);
      expect(request.request.method).toEqual('GET');
      request.flush(value); tick();
      expect(outpt.content).toEqual(value);
      http.verify();
    }));

    it('should return response for request() with error', fakeAsync(() => {
      service
        .request(null, value, 'GET', {}, null)
        .subscribe((o) => outpt = o)
      ;
      request = http.expectOne(`${root}/${value}`);
      expect(request.request.body).toBeNull();
      expect(request.request.method).toEqual('GET');
      request.error(new ErrorEvent(value), { status: 401, statusText: 'Unauthorized' }); tick();
      expect(outpt.error.message).toEqual('401 Unauthorized');
      http.verify();
    }));

  });

});
