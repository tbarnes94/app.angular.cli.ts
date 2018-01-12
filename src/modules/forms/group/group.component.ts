/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import { FormGroup } from '@angular/forms' ;
import { CommonComponent } from '@kuwas/angular' ;
import { ObjectStrings } from '@kuwas/angular' ;
import { BehaviorSubject } from 'rxjs/Rx' ;
import { Observable } from 'rxjs/Rx' ;

import { FormControl } from '../shared/types/basic/form.schemas' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'forms-group' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './group.component.styl' ] ,
  template :
  `
    <!-- controls -->
    <fieldset
      class='mat-form-controls'
      >
      <!-- label -->
      <legend
        *ngIf='( this.label )'
        class='mat-form-label'
        >
        <span
          [innerHtml]='this.label'
          >
        </span>
        <!-- tooltip -->
        <i
          *ngIf='( this.tooltip )'
          [matTooltip]='this.tooltip'
          [matTooltipPosition]='"above"'
          class='mat-form-tooltip fa fa-question-circle'
          role='tooltip'
          tabindex='0'
          >
        </i>
      </legend>
      <!-- input -->
      <div
        fxLayoutWrap
        [fxLayout]='"row"'
        [fxLayout.lt-sm]='"column"'
        [ngClass.lt-sm]='"small"'
        >
        <ng-container *ngFor='let input of this.schemas' >
          <!-- "label" -->
          <label
            *ngIf='input.label'
            [id]='( this.id + "-" + input.key + "-label" )'
            [for]='( this.id + "-" + input.key )'
            class='mat-aria-txt'
            >
            {{ this.toAny( input.label , this.forms ) }}
          </label>
          <!-- input -->
          <mat-form-field
            *ngIf='( input.element === "input" )'
            [fxFlex]='"0 0 " + input.width'
            [floatPlaceholder]='"never"'
            [ngClass]=
            '{
              "mat-has-prefix" : input.prefix ,
              "mat-has-suffix" : input.suffix
            }'
            >
            <input
              matInput
              [id]='( this.id + "-" + input.key )'
              [formControl]='this.model.controls[ input.key ]'
              [attr.aria-labelledby]='( this.id + "-" + input.key + "-label" )'
              (blur)='this.ngOnChanges()'
              (keypress)='this.ngOnChanges()'
              [readonly]='input.readonly'
              [maxlength]='input.maxlength'
              [type]='input.type'
              />
            <i
              *ngIf='input.prefix'
              class='fa fa-{{ input.prefix }}'
              aria-hidden='true'
              matPrefix
              >
            </i>
            <i
              *ngIf='input.suffix'
              class='fa fa-{{ input.suffix }}'
              aria-hidden='true'
              matSuffix
              >
            </i>
          </mat-form-field>
          <!-- datepicker -->
          <mat-form-field
            *ngIf='( input.element === "datepicker" )'
            [fxFlex]='"0 0 " + input.width'
            [floatPlaceholder]='"never"'
            class='mat-datepicker-field'
            >
            <input
              matInput
              [id]='( this.id + "-" + input.key )'
              [formControl]='this.model.controls[ input.key ]'
              [attr.aria-labelledby]='( this.id + "-" + input.key + "-label" )'
              (blur)='this.ngOnChanges()'
              (keypress)='this.ngOnChanges()'
              [matDatepicker]='dates'
              [readonly]='input.readonly'
              [maxlength]='input.maxlength'
              [type]='input.type'
              [min]='input.min'
              [max]='input.max'
              />
            <mat-datepicker-toggle
              [for]='dates'
              matSuffix
              >
            </mat-datepicker-toggle>
            <mat-datepicker
              touchUi='true'
              #dates
              >
            </mat-datepicker>
          </mat-form-field>
          <!-- select -->
          <div
            *ngIf='( input.element === "select" )'
            [fxFlex]='"0 0 " + input.width'
            class='mat-form-field'
            [ngClass]=
            '{
              "mat-form-field-invalid" :
              (
                this.model.controls[ input.key ].invalid &&
                (
                  this.model.controls[ input.key ].touched ||
                  this.check
                )
              )
            }'
            >
            <div class='mat-form-field-wrapper' >
              <div class='mat-form-field-flex' >
                <div class='mat-form-field-infix' >
                  <select
                    [id]='( this.id + "-" + input.key )'
                    [formControl]='this.model.controls[ input.key ]'
                    [attr.aria-labelledby]='( this.id + "-" + input.key + "-label" )'
                    (blur)='this.ngOnChanges()'
                    class='mat-select-element'
                    >
                    <option
                      [disabled]='true'
                      [value]='null'
                      >
                      {{ ( input.hint ) ? this.toAny( input.label , this.forms ) : '' }}
                    </option>
                    <option
                      *ngFor='let option of ( this.toAny( input.options , this.forms ) )'
                      [value]='option.value'
                      >
                      {{ option.title }}
                    </option>
                  </select>
                  <div class='mat-form-field-suffix' >
                    <i
                      class='fa fa-caret-down'
                      aria-hidden='true'
                      >
                    </i>
                  </div>
                </div>
              </div>
              <div class='mat-form-field-underline' >
                <span class='mat-form-field-ripple' ></span>
              </div>
            </div>
          </div>
          <!-- radio -->
          <mat-radio-group
            *ngIf='( input.element === "radio" )'
            [id]='( this.id + "-" + input.key )'
            [formControl]='this.model.controls[ input.key ]'
            >
            <mat-radio-button
              *ngFor='let option of ( this.toAny( input.options , this.forms ) )'
              [aria-label]='input.label'
              [value]='option.value'
              [color]='input.color'
              >
              {{ option.title }}
            </mat-radio-button>
          </mat-radio-group>
          <!-- check -->
          <mat-checkbox
            *ngIf='( input.element === "check" )'
            [fxFlex]='"0 0 " + input.width'
            [id]='( this.id + "-" + input.key )'
            [formControl]='this.model.controls[ input.key ]'
            [aria-label]='input.label'
            [color]='input.color'
            >
            {{ input.label }}
          </mat-checkbox>
        </ng-container>
      </div>
    </fieldset>
    <!-- error -->
    <mat-error *ngIf=
      '(
        ( this.error ) &&
        ( ( this.error$ | async ).length > 0 ) &&
        (
          ( this.touch$ | async ) === true ||
          ( this.pristine$ | async ) === false ||
          ( this.check )
        )
      )'
      [ngClass.lt-sm]='"small"'
      >
      <ng-container
        *ngFor='let k of ( this.error$ | async )'
        >
        <div
          *ngIf='this.error[ k ]'
          role='alert'
          >
          {{ this.error[ k ] }}
        </div>
      </ng-container>
    </mat-error>
  ` ,
})
export class FormsGroupComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly forms : FormGroup = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly model : FormGroup = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas : Array<FormControl> = null ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onValueEvent : EventEmitter<FormGroup> = new EventEmitter() ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly id : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly label : string = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly error : ObjectStrings = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly check : boolean = false ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly tooltip : string = null ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly model$ : BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>( null ) ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly control$ : Observable<any> = this.model$
    .filter( ( o ) => ( !!o && !!o.controls ) )
    .filter( ( o ) => ( Object.keys( o.controls ).length > 0 ) )
    .map( ( o ) => o.controls )
    .takeUntil( this.destroy$ )
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly error$ : Observable<any> = this.control$
    .switchMap( ( o ) => Observable.from( Object.keys( o ) ).reduce( ( t , k : string , i ) => this.merge( t , o[ k ] ) , {} ) )
    .map( ( o ) => Object.keys( o ) )
    .takeUntil( this.destroy$ )
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly pristine$ : Observable<boolean> = this.control$
    .switchMap( ( o ) => Observable.from( Object.keys( o ) ).every( ( k ) => ( !!o[ k ].pristine ) ) )
    .takeUntil( this.destroy$ )
    ;

  /**
   * http://reactivex.io/documentation/observable.html
   */
  public readonly touch$ : Observable<boolean> = this.control$
    .switchMap( ( o ) => Observable.from( Object.keys( o ) ).every( ( k ) => ( !!o[ k ].touched ) ) )
    .takeUntil( this.destroy$ )
    ;

  /**
   * @param a
   * @param b
   */
  public merge( a , b ) : any
  {
    return ( b.errors )
      ? Object.assign( a , b.errors )
      : a
      ;
  }

  /**
   * @param input
   * @param forms
   * @returns any
   */
  public toAny( input : any , forms : FormGroup ) : any
  {
    return ( typeof input === 'function' )
      ? input( forms )
      : input
      ;
  }

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit() : void
  {
    this.model.valueChanges
      .takeUntil( this.destroy$ )
      .subscribe( ( o ) =>
      {
        this.onValueEvent.next( this.model ) ;
        this.ngOnChanges() ;
      })
      ;
  }

  /**
   * https://angular.io/api/core/OnChanges
   * https://angular.io/api/core/OnChanges#ngOnChanges
   */
  public ngOnChanges() : void
  {
    this.model$.next( this.model ) ;
  }

}
