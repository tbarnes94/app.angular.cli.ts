/** @imports */
import { Component } from '@angular/core' ;
import { ActivatedRoute } from '@angular/router' ;

import { CommonComponent } from '../common/common.component' ;
import { CommonService } from '../shared/service/common.service' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'commons-container' ,
  styles : [ `` ] ,
  template : `` ,
})
export class CommonContainerComponent extends CommonComponent
{
  /**
   * Constructor
   * @param route       https://angular.io/api/router/ActivatedRoute
   * @param common      https://angular.io/tutorial/toh-pt4
   */
  public constructor(
    protected readonly route : ActivatedRoute ,
    protected readonly common : CommonService ,
  ) {
    super() ;
  }

}
