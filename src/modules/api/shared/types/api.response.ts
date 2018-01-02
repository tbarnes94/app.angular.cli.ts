/** @imports */
import { HttpResponseBase } from '@angular/common/http' ;

/**
 * https://angular.io/api/common/http/HttpResponse
 */
export class ApiResponse<T>
{
  public constructor(
    public readonly content : T ,
    public readonly response? : HttpResponseBase ,
    public readonly timestamp? : Date ,
  ) {}

}
