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
        >
        <div
          [fxLayout]='"row"'
          [fxLayout.lt-md]='"column"'
          fxLayoutWrap
          >
          <!-- groups -->
          <ng-container
            *ngFor='let group of section.children'
            >
            <forms-group
              *ngIf='( group.children[0] ) as one'
              [fxFlex]='"0 0 calc(" + group.width + ")"'
              [model]='this.controls[ section.key ].controls[ group.key ]'
              [id]='( section.key + "-" + group.key + "-" + one.key )'
              [label]='group.label'
              [tooltip]='group.tooltip'
              [error]='group.error'
              [check]='( this.check$ | async )'
              >
              <!-- controls -->
              <div
                *ngFor='let input of group.children'
                [fxFlex]='"0 0 calc(" + input.width + ")"'
                >
                <!-- input -->
                <mat-form-field
                  *ngIf='( input.element === "input" )'
                  [floatPlaceholder]='"never"'
                  >
                  <input
                    matInput
                    [formControl]='this.controls[ section.key ].controls[ group.key ].controls[ input.key ]'
                    [id]='( section.key + "-" + group.key + "-" + input.key )'
                    [placeholder]='input.placeholder'
                    [maxlength]='input.maxlength'
                    [type]='input.type'
                    />
                </mat-form-field>
                <!-- select -->
                <mat-form-field
                  *ngIf='( input.element === "select" )'
                  [floatPlaceholder]='"never"'
                  >
                  <mat-select
                    [formControl]='this.controls[ section.key ].controls[ group.key ].controls[ input.key ]'
                    [id]='( section.key + "-" + group.key + "-" + input.key )'
                    [placeholder]='input.placeholder'
                    >
                    <mat-option
                      *ngFor='let option of input.options'
                      [value]='option.value'
                      >
                      {{ option.title }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
                <!-- check -->
                <mat-checkbox
                  *ngIf='( input.element === "check" )'
                  [formControl]='this.controls[ section.key ].controls[ group.key ].controls[ input.key ]'
                  [id]='( section.key + "-" + group.key + "-" + input.key )'
                  [color]='input.color'
                  >
                  {{ input.label }}
                </mat-checkbox>
                <!-- radio -->
                <mat-radio-group
                  *ngIf='( input.element === "radio" )'
                  [fxLayout]='"row"'
                  [fxLayout.lt-md]='"column"'
                  [formControl]='this.controls[ section.key ].controls[ group.key ].controls[ input.key ]'
                  [id]='( section.key + "-" + group.key + "-" + input.key )'
                  >
                  <mat-radio-button
                    *ngFor='let option of input.options'
                    [value]='option.value'
                    [color]='input.color'
                    >
                    {{ option.title }}
                  </mat-radio-button>
                </mat-radio-group>
              </div>
            </forms-group>
          </ng-container>
        </div>
      </forms-section>
      <!-- actions -->
      <div
        class='mat-form-actions'
        >
        <span
          *ngFor='let action of this.schemas.actions'
          >
          <button
            *ngIf='action.element === "button"'
            mat-raised-button
            [color]='action.color'
            (click)='this.onClick(action.click)'
            [disabled]='action.disabled'
            [attr.type]='action.type'
            >
            {{ action.label }}
          </button>
          <a
            *ngIf='action.element === "a"'
            mat-raised-button
            [color]='action.color'
            (click)='this.onClick(action.click)'
            [disabled]='action.disabled'
            [attr.href]='action.href'
            >
            {{ action.label }}
          </a>
        </span>
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
          three[control.key] = new FormControl(control.value, control.validators);
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
