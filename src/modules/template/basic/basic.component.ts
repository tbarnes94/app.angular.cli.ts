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
    <mat-card>
      <!-- title -->
      <mat-card-title *ngIf='( this.translations[ this.key ].title )' >
        {{ this.translations[ this.key ].title }}
      </mat-card-title>
      <!-- subtitle -->
      <mat-card-subtitle *ngIf='( this.translations[ this.key ].subtitle )' >
        {{ this.translations[ this.key ].subtitle }}
      </mat-card-subtitle>
      <!-- menus -->
      <mat-card-content>
        <ng-content select='.template-menus' ></ng-content>
      </mat-card-content>
      <!-- divider -->
      <hr *ngIf='this.divider' />
      <!-- contact -->
      <ng-container *ngIf='( this.loads$ | async ) === false' >
        <!-- contact error -->
        <div *ngIf='( this.error$ | async ) as error' class='mat-error-section' >
          <mat-icon>error</mat-icon>
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
      <mat-card-actions *ngIf='( this.translations[ this.key ].actions )' >
        {{ this.translations[ this.key ].actions }}
      </mat-card-actions>
      <!-- footer -->
      <mat-card-footer *ngIf='( this.translations[ this.key ].footer )' >
        {{ this.translations[ this.key ].footer }}
      </mat-card-footer>
      <!-- loads -->
      <div
        *ngIf='( this.loads$ | async ) === true'
        fxLayout='row'
        fxLayoutAlign='center center'
        class='loads'
        >
        <mat-spinner></mat-spinner>
      </div>
    </mat-card>
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
