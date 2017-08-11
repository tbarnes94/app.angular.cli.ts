import { HttpErrorResponse } from '@angular/common/http';

import { ObjectAny } from '../../../commons';

/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
export class ApiError {
  public constructor(public readonly response: HttpErrorResponse,
                     public readonly error: ObjectAny | { message?: string }) {
  }
}
