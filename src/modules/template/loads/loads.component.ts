import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { CommonComponent } from '@kuwas/angular';
import { ObjectAny } from '@kuwas/angular';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'template-loads',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `` ],
  template: `
    <!-- loads -->
    <div
      fxLayout='row'
      fxLayoutAlign='center center'
      class='loads'
      >
      <!-- template -->
      <ng-container
        *ngIf='( this.loads ) ; then start else complete ;'
        >
      </ng-container>
      <!-- complete -->
      <ng-template #complete>
        <span
          *ngIf='( this.shown$ | async )'
          class='mat-aria-txt'
          role='status'
          >
          {{ this.modules.loads[this.key].complete }}
        </span>
      </ng-template>
      <!-- start -->
      <ng-template #start>
        <!-- spinner -->
        <mat-spinner
          *ngIf='( this.style === "spinner" )'
          >
        </mat-spinner>
        <!-- progress -->
        <mat-progress-bar
          *ngIf='( this.style === "progress" )'
          [mode]='"indeterminate"'
          >
        </mat-progress-bar>
        <!-- texts -->
        <span
          *ngIf='( this.shown$ | async )'
          class='mat-aria-txt'
          role='status'
          >
          {{ this.modules.loads[this.key].start }}
        </span>
      </ng-template>
    </div>
  `,
})
export class TemplateLoadsComponent extends CommonComponent {

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly key: string = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly loads: boolean = false;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly modules: ObjectAny = {};

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly style: string = null;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly loads$: Subject<boolean> = new Subject<boolean>();

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly shown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * https://angular.io/api/core/OnChanges
   * https://angular.io/api/core/OnChanges#ngOnChanges
   */
  public ngOnChanges(): void {
    this.loads$.next(this.loads);
  }

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit(): void {

    this.loads$
      .switchMap((o) => Observable.of(o).delay(5000))
      .takeUntil(this.destroy$)
      .subscribe((o) => this.shown$.next(false))
      ;

    this.loads$
      .takeUntil(this.destroy$)
      .subscribe((o) => this.shown$.next(true))
      ;

  }

}
