import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonComponent } from '../../commons';
import { CommonService } from '../../commons';

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector: 'template-common',
  styles: [ `` ],
  template: ``,
})
export class TemplateCommonComponent extends CommonComponent {

  /**
   * Constructor
   * @param route     https://angular.io/api/router/ActivatedRoute
   * @param common    https://angular.io/tutorial/toh-pt4
   */
  public constructor(protected readonly route: ActivatedRoute,
                     protected readonly common: CommonService) {
    super(route, common);
  }

}
