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
import { FormControl as FormControlSchema } from '../shared/types/form/form.schemas';
import { FormSection as FormSectionSchema } from '../shared/types/group/form.section';
import { FormGroup as FormGroupSchema } from '../shared/types/group/form.group';

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
      [formGroup]='this.model'
      (ngSubmit)='this.onComplete(this.model)'
      >
      <!-- sections -->
      <forms-section
        *ngFor='let sec of this.schemas.sections'
        [title]='sec.title'
        [description]='sec.description'
        [divider]='sec.divider'
        >
        <div
          fxLayoutWrap
          [fxLayout]='"row"'
          [fxLayout.lt-sm]='"column"'
          >
          <!-- groups -->
          <ng-container *ngFor='let sup of sec.children' >
            <!-- section -->
            <div
              *ngIf='( this.isShown(sup, this.model) && sup.isSection )'
              fxLayoutWrap
              [fxLayout]='"row"'
              [fxLayout.lt-sm]='"column"'
              [fxFlex]='"0 0 calc(" + sup.width + ")"'
              >
              <ng-container *ngFor='let sub of sup.children' >
                <forms-group
                  *ngIf='( this.isShown(sub, this.model) )'
                  [fxFlex]='"0 0 calc(" + sub.width + ")"'
                  [model]='this.schemaz[ sec.key ].controls[ sup.key ].controls[ sub.key ]'
                  [schemas]='sub.children'
                  [id]='( sec.key + "-" + sup.key + "-" + sub.key + "-" + sub.children[0].key )'
                  [label]='sub.label'
                  [tooltip]='sub.tooltip'
                  [error]='sub.error'
                  [check]='( this.check$ | async )'
                  >
                </forms-group>
              </ng-container>
            </div>
            <!-- non-section -->
            <ng-container *ngIf='( !sup.isSection )' >
              <forms-group
                *ngIf='( this.isShown(sup, this.model) )'
                [fxFlex]='"0 0 calc(" + sup.width + ")"'
                [model]='this.schemaz[ sec.key ].controls[ sup.key ]'
                [schemas]='sup.children'
                [id]='( sec.key + "-" + sup.key + "-" + sup.children[0].key )'
                [label]='sup.label'
                [tooltip]='sup.tooltip'
                [error]='sup.error'
                [check]='( this.check$ | async )'
                >
              </forms-group>
            </ng-container>
          </ng-container>
        </div>
      </forms-section>
      <!-- divider -->
      <hr *ngIf='( this.schemas.divider )' />
      <!-- actions -->
      <div class='mat-form-actions' >
        <span
          *ngFor='let act of this.schemas.actions'
          >
          <!-- buttons -->
          <ng-container *ngIf='act.element === "button"' >
            <!-- non-click -->
            <ng-container *ngIf='( !act.click )' >
              <button
                mat-raised-button
                [color]='act.color'
                [disabled]='act.disabled'
                [type]='act.type'
                >
                {{ act.label }}
              </button>
            </ng-container>
            <!-- click -->
            <ng-container *ngIf='( !!act.click )' >
              <button
                mat-raised-button
                [color]='act.color'
                [disabled]='act.disabled'
                (click)='this.onClick(act.click)'
                [type]='act.type'
                >
                {{ act.label }}
              </button>
            </ng-container>
          </ng-container>
          <!-- links -->
          <ng-container *ngIf='act.element === "a"' >
            <!-- href -->
            <ng-container *ngIf='( !!act.href )' >
              <a
                mat-raised-button
                [color]='act.color'
                [disabled]='act.disabled'
                [target]='act.target'
                [href]='act.href'
                >
                {{ act.label }}
              </a>
            </ng-container>
            <!-- click -->
            <ng-container *ngIf='( !!act.click )' >
              <a
                mat-raised-button
                [color]='act.color'
                [disabled]='act.disabled'
                (click)='this.onClick(act.click)'
                [routerLink]=''
                >
                {{ act.label }}
              </a>
            </ng-container>
            <!-- route -->
            <ng-container *ngIf='( !!act.route )' >
              <a
                mat-raised-button
                [color]='act.color'
                [disabled]='act.disabled'
                [routerLink]='act.route'
                >
                {{ act.label }}
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
  @Input() public model: FormGroup = null;

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
  public schemaz: any = null;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly check$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * https://angular.io/api/forms/ReactiveFormsModule
   */
  public build(): void {
    const payload: any = {};
    this.schemas.sections.map(this.section.bind(this, payload));
    this.model = new FormGroup(payload);
    this.schemaz = payload;
  }

  /**
   * @param total
   * @param current
   * @returns FormSectionSchema
   */
  public section<T>(total: any, current: FormSectionSchema<T>): FormSectionSchema<T> {
    const payload: any = {};
    current.children.map(this.group.bind(this, payload));
    total[current.key] = new FormGroup(payload);
    return current;
  }

  /**
   * @param total
   * @param current
   * @returns FormGroupSchema
   */
  public group<T>(total: any, current: FormGroupSchema<T>): FormGroupSchema<T> {
    const payload: any = {};
    current.children.map((!current.isSection) ? this.control.bind(this, payload) : this.group.bind(this, payload));
    total[current.key] = new FormGroup(payload);
    return current;
  }

  /**
   * @param total
   * @param current
   * @returns FormControlSchema
   */
  public control(total: any, current: FormControlSchema): FormControlSchema {
    const payload: any = {
      disabled: current.disabled,
      value: current.value,
    };
    total[current.key] = new FormControl(payload, current.validators);
    return current;
  }

  /**
   * @param schemas
   * @param model
   * @returns boolean
   */
  public isShown<T>(schemas: FormGroupSchema<T>, model: FormGroup): boolean {
    return ( schemas.isShown ) ? schemas.isShown( model ) : true;
  }

  /**
   * https://angular.io/guide/user-input
   * @param model
   */
  public onComplete(model: FormGroup): void {
    if (model.valid) {
      this.onCompleteEvent.next(model);
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
