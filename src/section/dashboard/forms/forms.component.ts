import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthLogout } from '../../auth';
import { FormSchemas } from '../../../modules/forms';
import { TemplateContainerComponent } from '../../../modules/template';
import { FormBuild } from './form.helpers';
import { FormSubmit } from './form.helpers';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'dashboard-forms',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <template-basic
      *ngIf='( this.translations$ | async ) as translations'
      [error]='( this.error$ | async )'
      [loads]='( this.loader$ | async )'
      [title]='translations.title'
      [divider]='false'
      >
      <div class='template-content' >
        <forms-basic
          *ngIf='( this.schemas$ | async ) as schemas'
          [schemas]='schemas'
          (onCompleteEvent)='this.onComplete($event)'
          (onClickEvent)='this.onClick($event)'
          >
          <div class='form-footer' >
            {{ translations.footer }}
          </div>
        </forms-basic>
      </div>
    </template-basic>
  `,
})
export class DashboardFormsComponent extends TemplateContainerComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public schemas$: Observable<FormSchemas> = this.forms.build$(
      this.language$,
      this.translations$,
      Observable.of(false),
      undefined,
      undefined,
      FormBuild,
    )
    .takeUntil(this.destroy$)
    ;

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onComplete(input: any): void {
    return FormSubmit(this.common, input);
  }

  /**
   * https://angular.io/guide/user-input
   */
  public onLogout(): void {
    this.common.dispatch(new AuthLogout(null));
  }

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit(): void {
    this.key$.next('dashboard.forms');
  }

}
