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
        <forms-form
          *ngIf='( this.schemas$ | async ) as schemas'
          [schemas]='schemas'
          (onCompleteEvent)='this.onComplete($event)'
          (onClickEvent)='this.onClick($event)'
          >
          <div class='form-footer' >
            {{ translations.footer }}
          </div>
        </forms-form>
      </div>
    </template-basic>
  `,
})
export class DashboardFormsComponent extends TemplateContainerComponent {

  /**
   * https://angular.io/api/forms/FormGroup
   */
  public schemas$: Observable<FormSchemas>;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public table$: Observable<any> = this.table.build$(
      this.language$,
      this.translations$,
      this.common.width$,
      this.common.select([ 'auth', 'token' ]),
      (o) => o,
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
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit(): void {
    this.key$.next('dashboard.forms');
    this.schemas$ = this.forms.build$(
        this.language$,
        this.translations$,
        Observable.of(false),
        undefined,
        FormBuild,
      )
      .takeUntil(this.destroy$)
      ;
    this.table$
      .subscribe((o) => console.log(o))
      ;
  }

  /**
   * https://angular.io/guide/user-input
   */
  public onLogout(): void {
    this.common.dispatch(new AuthLogout(null));
  }

}
