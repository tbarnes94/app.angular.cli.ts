import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TableSchemas } from '../../../modules/table';
import { TemplateContainerComponent } from '../../../modules/template';
import { TableBuild } from './table.helpers';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'dashboard-table',
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
        <table-basic
          *ngIf='( this.schemas$ | async ) as schemas'
          [schemas]='schemas'
          >
          <div class='table-empty' >
            {{ translations.empty }}
          </div>
        </table-basic>
      </div>
    </template-basic>
  `,
})
export class DashboardTableComponent extends TemplateContainerComponent {

  /**
   * https://angular.io/api/forms/FormGroup
   */
  public schemas$: Observable<TableSchemas>;

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit(): void {
    this.key$.next('dashboard.table');
    this.schemas$ = this.table.build$(
        this.language$,
        this.translations$,
        this.common.width$,
        this.http.get<Array<any>>('/assets/mocks/table.json'),
        undefined,
        TableBuild,
      )
      .takeUntil(this.destroy$)
      ;
  }

}
