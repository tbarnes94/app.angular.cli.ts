/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import { FormGroup } from '@angular/forms' ;
import { BehaviorSubject } from 'rxjs/Rx' ;
import { Observable } from 'rxjs/Rx' ;

import { CommonComponent } from '../../commons' ;
import { ObjectStrings } from '../../commons' ;
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
    <!-- label -->
    <label
      *ngIf='( this.label )'
      [for]='( this.id + "-" + this.schemas[ 0 ].key )'
      >
      <span [innerHtml]='this.label' ></span>
      <!-- tooltip -->
      <i
        *ngIf='( this.tooltip )'
        [matTooltip]='this.tooltip'
        [matTooltipPosition]='"above"'
        class='fa fa-question-circle'
        aria-hidden='true'
        >
      </i>
    </label>
    <!-- controls -->
    <div
      fxLayoutWrap
      [fxLayout]='"row"'
      [fxLayout.lt-sm]='"column"'
      [ngClass.lt-sm]='"small"'
      class='mat-form-controls'
      >
      <ng-container *ngFor='let input of this.schemas' >
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
            (blur)='this.ngOnChanges()'
            [readonly]='input.readonly'
            [placeholder]='input.placeholder'
            [maxlength]='input.maxlength'
            [type]='input.type'
            />
          <i
            *ngIf='input.prefix'
            matPrefix
            class='fa fa-{{ input.prefix }}'
            aria-hidden='true'
            >
          </i>
          <i
            *ngIf='input.suffix'
            matSuffix
            class='fa fa-{{ input.suffix }}'
            aria-hidden='true'
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
            [matDatepicker]='dates'
            [readonly]='input.readonly'
            [placeholder]='input.placeholder'
            [maxlength]='input.maxlength'
            [type]='input.type'
            [min]='input.min'
            [max]='input.max'
            tabIndex='-1'
            />
          <mat-datepicker-toggle
            matSuffix
            [for]='dates'
            >
          </mat-datepicker-toggle>
          <mat-datepicker
            #dates
            touchUi='true'
            >
          </mat-datepicker>
        </mat-form-field>
        <!-- select -->
        <mat-form-field
          *ngIf='( input.element === "select" )'
          [fxFlex]='"0 0 " + input.width'
          [floatPlaceholder]='"never"'
          >
          <mat-select
            [id]='( this.id + "-" + input.key )'
            [formControl]='this.model.controls[ input.key ]'
            (blur)='this.ngOnChanges()'
            [placeholder]='input.placeholder'
            >
            <mat-option
              *ngFor='let option of ( this.toAny( input.options , this.forms ) )'
              [value]='option.value'
              >
              {{ option.title }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <!-- check -->
        <mat-checkbox
          *ngIf='( input.element === "check" )'
          [fxFlex]='"0 0 " + input.width'
          [id]='( this.id + "-" + input.key )'
          [formControl]='this.model.controls[ input.key ]'
          [color]='input.color'
          >
          {{ input.label }}
        </mat-checkbox>
        <!-- radio -->
        <mat-radio-group
          *ngIf='( input.element === "radio" )'
          [id]='( this.id + "-" + input.key )'
          [formControl]='this.model.controls[ input.key ]'
          >
          <mat-radio-button
            *ngFor='let option of ( this.toAny( input.options , this.forms ) )'
            [value]='option.value'
            [color]='input.color'
            >
            {{ option.title }}
          </mat-radio-button>
        </mat-radio-group>
      </ng-container>
    </div>
    <!-- error -->
    <mat-error *ngIf=
      '(
        ( this.error ) &&
        ( this.model.invalid ) &&
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
        <div *ngIf='this.error[ k ]' >
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
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onValueEvent : EventEmitter<FormGroup> = new EventEmitter() ;

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
    this.model.valueChanges.subscribe( ( o ) =>
    {
      this.onValueEvent.next( this.model ) ;
      this.ngOnChanges() ;
    }) ;
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
