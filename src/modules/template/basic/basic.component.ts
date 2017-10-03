import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObjectAny } from '../../commons';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'template-basic',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <md-card>
      <!-- title -->
      <md-card-title *ngIf='( this.translations[ this.key ].title )' >
        {{ this.translations[ this.key ].title }}
      </md-card-title>
      <!-- subtitle -->
      <md-card-subtitle *ngIf='( this.translations[ this.key ].subtitle )' >
        {{ this.translations[ this.key ].subtitle }}
      </md-card-subtitle>
      <!-- menus -->
      <md-card-content>
        <ng-content select='.template-menus' ></ng-content>
      </md-card-content>
      <!-- divider -->
      <hr *ngIf='this.divider' />
      <!-- contact -->
      <ng-container *ngIf='( this.loads$ | async ) === false' >
        <!-- contact error -->
        <div *ngIf='( this.error$ | async ) as error' class='mat-error-section' >
          <md-icon>error</md-icon>
          <span [innerHTML]='
            ( this.translations.error && this.translations.error[ error ] )
            ? this.translations.error[ error ]
            : error
            ' >
          </span>
        </div>
        <!-- contact loads -->
        <ng-content select='.template-content-loads' ></ng-content>
      </ng-container>
      <!-- contact statics -->
      <ng-content select='.template-content' ></ng-content>
      <!-- actions -->
      <md-card-actions *ngIf='( this.translations[ this.key ].actions )' >
        {{ this.translations[ this.key ].actions }}
      </md-card-actions>
      <!-- footer -->
      <md-card-footer *ngIf='( this.translations[ this.key ].footer )' >
        {{ this.translations[ this.key ].footer }}
      </md-card-footer>
      <!-- loads -->
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

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly translations: ObjectAny = null;

  /**
   * https://angular.io/api/core/Input
   * http://reactivex.io/documentation/observable.html
   */
  @Input() public readonly loads$: Observable<boolean> = Observable.of(false);

  /**
   * https://angular.io/api/core/Input
   * http://reactivex.io/documentation/observable.html
   */
  @Input() public readonly error$: Observable<string> = Observable.of(null);

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly divider: boolean = false;

}
