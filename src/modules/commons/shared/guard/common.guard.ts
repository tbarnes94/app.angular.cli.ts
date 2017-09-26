/** @imports */
import { Injectable } from '@angular/core' ;
import { CanActivate } from '@angular/router' ;
import { Observable } from 'rxjs/Rx' ;

import { CommonService } from '../service/common.service' ;

/**
 * https://angular.io/api/core/Injectable
 * https://angular.io/api/router/CanActivate
 */
@Injectable()
export class CommonGuard implements CanActivate
{
  /**
   * https://angular.io/api/router/CanActivate#canActivate
   */
  public canActivate() : Observable<boolean>
  {
    return Observable.of( false ) ;
  }

  /**
   * Constructor
   * @param common    https://angular.io/tutorial/toh-pt4
   */
  public constructor( protected readonly common : CommonService ) {}

}
