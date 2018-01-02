/** @imports */
import { HttpResponseBase } from '@angular/common/http' ;
import { ApiErrorContent } from './api.error.content' ;

/**
 * https://angular.io/api/common/http/HttpErrorResponse
 */
export class ApiError
{
  public constructor(
    public readonly error : ApiErrorContent | any ,
    public readonly response? : HttpResponseBase ,
    public readonly timestamp? : Date ,
  ) {}

}
