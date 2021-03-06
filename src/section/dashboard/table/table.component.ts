import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TableClick } from '../../../modules/table';
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
      [event]='( this.event$ | async )'
      [loads]='( this.loader$ | async )'
      [modules]='( this.modules$ | async )'
      [title]='translations.title'
      [divider]='false'
      >
      <div class='template-content' >
        <table-basic
          *ngIf='( this.schemas$ | async ) as schemas'
          (onClickEvent)='this.onClickTable( $event )'
          [schemas]='schemas'
          >
          <div class='table-empty' >
            {{ translations.table.empty }}
          </div>
        </table-basic>
      </div>
    </template-basic>
  `,
})
export class DashboardTableComponent extends TemplateContainerComponent {

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public schemas$: Observable<TableSchemas> = this.table.build$(
      this.language$,
      this.translations$,
      this.modules$,
      this.common.width$,
      this.http.get<Array<any>>('/assets/mocks/table.json'),
      undefined,
      TableBuild,
    )
    .takeUntil(this.destroy$)
    ;

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onClickTable(input: TableClick): void {
    console.log(input);
  }

}
