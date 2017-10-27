import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/Rx';

import { CommonComponent } from '../../commons';
import { FormSchemas } from '../shared/types/form/form.schemas';

/**
 * https://angular.io/api/core/Component
 */
@Component({
  selector: 'forms-form',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: [ './form.component.styl' ],
  template: `
    <!-- forms -->
    <form
      [formGroup]='this.forms'
      (ngSubmit)='this.onComplete(this.forms)'
      >
      <!-- sections -->
      <forms-section
        *ngFor='let section of this.schemas.sections'
        [title]='section.title'
        [description]='section.description'
        [divider]='section.divider'
        >
        <div
          fxLayoutWrap
          [fxLayout]='"row"'
          [fxLayout.lt-md]='"column"'
          >
          <!-- groups -->
          <ng-container
            *ngFor='let group of section.children'
            >
            <forms-group
              *ngIf='( group.children[0] ) as one'
              [fxFlex]='"0 0 calc(" + group.width + ")"'
              [model]='this.controls[ section.key ].controls[ group.key ]'
              [schemas]='group.children'
              [id]='( section.key + "-" + group.key + "-" + one.key )'
              [label]='group.label'
              [tooltip]='group.tooltip'
              [error]='group.error'
              [check]='( this.check$ | async )'
              >
            </forms-group>
          </ng-container>
        </div>
      </forms-section>
      <!-- divider -->
      <hr *ngIf='( this.schemas.divider )' />
      <!-- actions -->
      <div class='mat-form-actions' >
        <span
          *ngFor='let action of this.schemas.actions'
          >
          <!-- buttons -->
          <ng-container
            *ngIf='action.element === "button"'
            >
            <!-- non-click -->
            <ng-container *ngIf='( !action.click )' >
              <button
                mat-raised-button
                [color]='action.color'
                [disabled]='action.disabled'
                [type]='action.type'
                >
                {{ action.label }}
              </button>
            </ng-container>
            <!-- click -->
            <ng-container *ngIf='( !!action.click )' >
              <button
                mat-raised-button
                [color]='action.color'
                [disabled]='action.disabled'
                (click)='this.onClick(action.click)'
                [type]='action.type'
                >
                {{ action.label }}
              </button>
            </ng-container>
          </ng-container>
          <!-- links -->
          <ng-container
            *ngIf='action.element === "a"'
            >
            <!-- href -->
            <ng-container *ngIf='( !!action.href )' >
              <a
                mat-raised-button
                [color]='action.color'
                [disabled]='action.disabled'
                [target]='action.target'
                [href]='action.href'
                >
                {{ action.label }}
              </a>
            </ng-container>
            <!-- click -->
            <ng-container *ngIf='( !!action.click )' >
              <a
                mat-raised-button
                [color]='action.color'
                [disabled]='action.disabled'
                (click)='this.onClick(action.click)'
                [routerLink]=''
                >
                {{ action.label }}
              </a>
            </ng-container>
            <!-- route -->
            <ng-container *ngIf='( !!action.route )' >
              <a
                mat-raised-button
                [color]='action.color'
                [disabled]='action.disabled'
                [routerLink]='action.route'
                >
                {{ action.label }}
              </a>
            </ng-container>
          </ng-container>
        </span>
      </div>
      <!-- footer -->
      <div>
        <ng-content
          select='.form-footer'
          >
        </ng-content>
      </div>
    </form>
  `,
})
export class FormsFormComponent extends CommonComponent {

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public forms: FormGroup = null;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas: FormSchemas = null;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onCompleteEvent: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  /**
   * https://angular.io/api/core/Input
   */
  public controls: any = null;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly check$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * https://angular.io/api/forms/ReactiveFormsModule
   */
  public build(): void {

    const one: any = {};
    this.schemas.sections.map((section) => {

      const two: any = {};
      section.children.map((group) => {

        const three: any = {};
        group.children.map((control) => {
          const payload: any = {
            disabled: control.disabled,
            value: control.value,
          };
          three[control.key] = new FormControl(payload, control.validators);
          return control;
        });

        two[group.key] = new FormGroup(three);
        return group;

      });

      one[section.key] = new FormGroup(two);
      return section;

    });

    this.forms = new FormGroup(one);
    this.controls = one;

  }

  /**
   * https://angular.io/guide/user-input
   * @param forms
   */
  public onComplete(forms: FormGroup): void {
    if (forms.valid) {
      this.onCompleteEvent.next(forms);
    } else {
      this.check$.next(true);
    }
  }

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onClick(input: string): void {
    this.onClickEvent.next(input);
  }

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit(): void {
    this.build();
  }

}
