import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormService } from '@ng2-dynamic-forms/core';

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
   * @param forms     https://github.com/udos86/ng-dynamic-forms
   */
  public constructor(protected readonly route: ActivatedRoute,
                     protected readonly common: CommonService,
                     protected readonly forms: DynamicFormService) {
    super(route, common);
  }

}
