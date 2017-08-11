import { HttpResponse } from '@angular/common/http';

/**
 * https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
 */
export class ApiResponse<T> {
  public constructor(public readonly response: HttpResponse<T>,
                     public readonly content: T) {
  }
}
