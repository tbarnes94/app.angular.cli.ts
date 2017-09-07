import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObjectAny } from '../../commons';

/**
 * https://angular.io/guide/ngmodule#declare-directives-and-components
 */
@Component({
  selector: 'template-basic',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <md-card>
      <md-card-title>
        {{ this.translations[this.key].title }}
      </md-card-title>
      <md-card-content>
        <ng-content select='.template-menus' ></ng-content>
      </md-card-content>
      <hr *ngIf='this.divider' />
      <ng-container *ngIf='( this.loads$ | async ) === false' >
        <div *ngIf='( this.error$ | async ) as error' class='mat-error-section' >
          <md-icon>error</md-icon>
          <span [innerHTML]='
            ( this.translations.error && this.translations.error[ error ] )
            ? this.translations.error[ error ]
            : error
            ' >
          </span>
        </div>
        <ng-content select='.template-content' ></ng-content>
      </ng-container>
      <div
        *ngIf='( this.loads$ | async ) === true'
        fxLayout='row'
        fxLayoutAlign='center center'
        class='loads'
        >
        <md-spinner></md-spinner>
      </div>
    </md-card>
  `,
})
export class TemplateBasicComponent {

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly key: string = null;
  @Input() public readonly translations: ObjectAny = null;
  @Input() public readonly loads$: Observable<boolean> = Observable.of(false);
  @Input() public readonly error$: Observable<string> = Observable.of(null);
  @Input() public readonly divider: boolean = false;

}
