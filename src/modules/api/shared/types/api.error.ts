import { HttpErrorResponse } from '@angular/common/http';

import { ObjectAny } from '../../../commons';

/**
 * https://angular.io/api/common/http/HttpErrorResponse
 */
export class ApiError {
  public constructor(public readonly response: HttpErrorResponse,
                     public readonly error: ObjectAny | { message?: string }) {
  }
}
