/** @imports */
import { Component } from '@angular/core' ;
import { ActivatedRoute } from '@angular/router' ;

import { CommonService } from '../shared/service/common.service' ;
import { CommonComponent } from './common.component' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'commons-common-container' ,
  styles : [ `` ] ,
  template : `` ,
})
export class CommonContainerComponent extends CommonComponent
{
  /**
   * Constructor
   * @param route     https://angular.io/api/router/ActivatedRoute
   * @param common    https://angular.io/tutorial/toh-pt4
   */
  public constructor(
    protected readonly route : ActivatedRoute ,
    protected readonly common : CommonService ,
  ) {
    super() ;
  }

}
