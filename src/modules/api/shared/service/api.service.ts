import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ObjectStrings } from '../../../commons/shared/types/object.strings';
import { print } from '../../../commons/shared/helpers/common.helpers';
import { ApiError } from '../types/api.error';
import { ApiOptions } from '../types/api.options';
import { ApiResponse } from '../types/api.response';

/**
 * https://angular.io/tutorial/toh-pt4
 */
@Injectable()
export class ApiService {

  /**
   * @param h         https://angular.io/api/common/http/HttpHeaders
   * @returns         https://angular.io/api/common/http/HttpHeaders
   */
  public headers(h: ObjectStrings): HttpHeaders {
    return new HttpHeaders(Object.assign({}, h));
  }

  /**
   * @param r         https://angular.io/api/common/http/HttpResponse
   * @returns         http://reactivex.io/documentation/observable.html
   */
  public error(r: HttpErrorResponse): Observable<ApiError> {
    return Observable.of(
      new ApiError(
        r,
        ( !r.error || !r.error.message )
          ? { message: `${ r.status } ${ r.statusText }` }
          : r.error
        ,
      )
    )
      ;
  }

  /**
   * @param r         https://angular.io/api/common/http/HttpResponse
   * @returns         http://reactivex.io/documentation/observable.html
   */
  public response<T>(r: HttpResponse<T>): ApiResponse<T> {
    return new ApiResponse<T>(r, r.body);
  }

  /**
   * @param host      https://angular.io/api/common/http/HttpClient
   * @param path      https://angular.io/api/common/http/HttpClient
   * @param method    https://angular.io/api/common/http/HttpClient
   * @param headers   https://angular.io/api/common/http/HttpClient
   * @param body      https://angular.io/api/common/http/HttpClient
   * @returns         http://reactivex.io/documentation/observable.html
   */
  public request<R, S>(host: string,
                       path: string,
                       method: string,
                       headers: ObjectStrings,
                       body?: R): Observable<ApiResponse<S> | ApiError> {
    return this.http.request<S>(
      method,
      ( host ) ? `${ host }/${ path }` : `${ this.options.root }/${ path }`, {
        headers: this.headers(headers),
        body: ( body ) ? body : undefined,
        observe: 'response',
      },
    )
      .map((o: HttpResponse<S>) => this.response<S>(o))
      .catch((o: HttpErrorResponse) => this.error(o))
      .do(print.bind(this, 'ApiService'))
      ;

  }

  /**
   * Constructor
   * @param options   https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
   * @param http      https://angular.io/api/common/http/HttpClient
   */
  public constructor(protected readonly options: ApiOptions,
                     protected readonly http: HttpClient) {
  }

}
