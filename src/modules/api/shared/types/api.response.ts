/** @imports */
import { HttpResponse } from '@angular/common/http' ;

/**
 * https://angular.io/api/common/http/HttpResponse
 */
export class ApiResponse<T>
{
  public constructor(
    public readonly response : HttpResponse<T> ,
    public readonly content : T ,
  ) {}

}
