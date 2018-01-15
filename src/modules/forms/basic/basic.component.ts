/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import { FormControl } from '@angular/forms' ;
import { FormGroup } from '@angular/forms' ;
import { MatDatepickerIntl } from '@angular/material' ;
import { CommonComponent } from '@kuwas/angular' ;
import { isObject } from 'lodash-es' ;
import { BehaviorSubject } from 'rxjs/Rx' ;

import { FormSchemas } from '../shared/types/basic/form.schemas' ;
import { FormControl as FormControlSchema } from '../shared/types/basic/form.schemas' ;
import { FormGroup as FormGroupSchema } from '../shared/types/group/form.group' ;
import { FormSection as FormSectionSchema } from '../shared/types/group/form.section' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'forms-basic' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './basic.component.styl' ] ,
  template :
  `
    <!-- forms -->
    <form
      [formGroup]='this.model'
      (ngSubmit)='this.onComplete( this.model )'
      role='form'
      >
      <!-- sections -->
      <forms-section
        *ngFor='let sec of this.schemas.sections'
        [title]='sec.title'
        [subtitle]='sec.subtitle'
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
              *ngIf=
              '(
                sup.section &&
                this.toBoolean( sup.shown , this.model , true )
              )'
              fxLayoutWrap
              [fxLayout]='"row"'
              [fxLayout.lt-sm]='"column"'
              [fxFlex]='"0 0 " + sup.width'
              >
              <ng-container *ngFor='let sub of sup.children' >
                <forms-group
                  *ngIf='this.toBoolean( sub.shown , this.model , true )'
                  [fxFlex]='"0 0 " + sub.width'
                  [id]='( sec.key + "-" + sup.key + "-" + sub.key )'
                  [forms]='this.model'
                  [model]='this.schemaz[ sec.key ].controls[ sup.key ].controls[ sub.key ]'
                  [schemas]='sub.children'
                  (onValueEvent)='this.onEvent( sub.onValue , this.model , $event )'
                  [label]='this.toAny( sub.label , this.model )'
                  [error]='this.toAny( sub.error , this.model )'
                  [check]='( this.check$ | async )'
                  [tooltip]='sub.tooltip'
                  >
                </forms-group>
              </ng-container>
            </div>
            <!-- non-section -->
            <ng-container *ngIf='( !sup.section )' >
              <forms-group
                *ngIf='this.toBoolean( sup.shown , this.model , true )'
                [fxFlex]='"0 0 " + sup.width'
                [id]='( sec.key + "-" + sup.key )'
                [forms]='this.model'
                [model]='this.schemaz[ sec.key ].controls[ sup.key ]'
                [schemas]='sup.children'
                (onValueEvent)='this.onEvent( sup.onValue , this.model , $event )'
                [label]='this.toAny( sup.label , this.model )'
                [error]='this.toAny( sup.error , this.model )'
                [check]='( this.check$ | async )'
                [tooltip]='sup.tooltip'
                >
              </forms-group>
            </ng-container>
          </ng-container>
        </div>
      </forms-section>
      <!-- divider -->
      <hr
        *ngIf='( this.schemas.divider )'
        aria-hidden='true'
        role='separator'
        />
      <!-- actions -->
      <nav
        class='mat-form-actions'
        [attr.aria-label]='this.schemas.translations.actions.title'
        role='navigation'
        >
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
                [disabled]='this.toBoolean( act.disabled , this.model )'
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
                [disabled]='this.toBoolean( act.disabled , this.model )'
                (click)='this.onClick( act.click )'
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
                [disabled]='this.toBoolean( act.disabled , this.model )'
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
                [disabled]='this.toBoolean( act.disabled , this.model )'
                (click)='this.onClick( act.click )'
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
                [disabled]='this.toBoolean( act.disabled , this.model )'
                [routerLink]='act.route'
                >
                {{ act.label }}
              </a>
            </ng-container>
          </ng-container>
        </span>
      </nav>
      <!-- footer -->
      <footer>
        <ng-content
          select='.form-footer'
          >
        </ng-content>
      </footer>
    </form>
  ` ,
})
export class FormsBasicComponent extends CommonComponent
{
  /**
   * https://angular.io/api/core/Input
   */
  @Input() public model : FormGroup = null ;

  /**
   * https://angular.io/api/core/Input
   */
  @Input() public readonly schemas : FormSchemas = null ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onCompleteEvent : EventEmitter<FormGroup> = new EventEmitter<FormGroup>() ;

  /**
   * https://angular.io/api/core/Output
   */
  @Output() public readonly onClickEvent : EventEmitter<string> = new EventEmitter<string>() ;

  /**
   * https://angular.io/api/core/Input
   */
  public schemaz : any = null ;

  /**
   * http://reactivex.io/documentation/subject.html
   */
  public readonly check$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false ) ;

  /**
   * https://angular.io/api/forms/ReactiveFormsModule
   */
  public build() : void
  {
    const payload : any = {} ;
    const calls : any = this.section.bind( this , payload ) ;
    this.schemas.sections.map( calls ) ;
    this.model = new FormGroup( payload ) ;
    this.schemaz = payload ;
  }

  /**
   * https://github.com/angular/material2/blob/master/src/lib/datepicker
   */
  public dates() : void
  {
    this.datepicker.calendarLabel = this.schemas.translations.datepicker.label ;
    this.datepicker.openCalendarLabel = this.schemas.translations.datepicker.open ;
    this.datepicker.switchToMonthViewLabel = this.schemas.translations.datepicker.month.click ;
    this.datepicker.prevMonthLabel = this.schemas.translations.datepicker.month.prev ;
    this.datepicker.nextMonthLabel = this.schemas.translations.datepicker.month.next ;
    this.datepicker.switchToYearViewLabel = this.schemas.translations.datepicker.year.click ;
    this.datepicker.prevYearLabel = this.schemas.translations.datepicker.year.prev ;
    this.datepicker.nextYearLabel = this.schemas.translations.datepicker.year.next ;
    this.datepicker.changes.next() ;
  }

  /**
   * @param total
   * @param items
   * @returns FormSectionSchema
   */
  public section<T>( total : any , items : FormSectionSchema<T> ) : FormSectionSchema<T>
  {
    const payload : any = {} ;
    const calls : any = this.group.bind( this , payload ) ;
    items.children.map( calls ) ;
    total[ items.key ] = new FormGroup( payload ) ;
    return items ;
  }

  /**
   * @param total
   * @param items
   * @returns FormGroupSchema
   */
  public group<T>( total : any , items : FormGroupSchema<T> ) : FormGroupSchema<T>
  {
    const payload : any = {} ;
    const calls : any = ( !items.section )
      ? this.control.bind( this , payload )
      : this.group.bind( this , payload )
      ;
    items.children.map( calls ) ;
    total[ items.key ] = new FormGroup( payload ) ;
    return items ;
  }

  /**
   * @param total
   * @param items
   * @returns FormControlSchema
   */
  public control( total : any , items : FormControlSchema ) : FormControlSchema
  {
    const payload : any =
    {
      disabled : items.disabled ,
      value : items.value ,
    } ;

    total[ items.key ] = new FormControl( payload , items.validators ) ;
    return items ;

  }

  /**
   * @param input
   * @returns any
   */
  public payload( input : any ) : any
  {
    let outpt : any = {} ;
    const keys : Array<string> = ( isObject( input ) )
      ? Object.keys( input )
      : new Array()
      ;

    if ( keys.length > 0 ) {

      const first : any = input[ keys[ 0 ] ] ;
      const keyz : Array<string> = ( isObject( first ) && !first._isAMomentObject )
        ? Object.keys( first )
        : new Array()
        ;

      if ( keys.length > 1 || keyz.length > 0 ) {
        keys.forEach( ( k ) => outpt[ k ] = this.payload( input[ k ] ) ) ;
      } else {
        outpt = first ;
      }

    } else {
      outpt = input ;
    }

    return outpt ;

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
   * @param input
   * @param forms
   * @param start
   * @returns boolean
   */
  public toBoolean( input : any , forms : FormGroup , start : boolean = false ) : boolean
  {
    return ( typeof input === 'function' )
      ? input( forms )
      : ( typeof input === 'boolean' )
        ? input
        : start
      ;
  }

  /**
   * @param input
   * @param forms
   * @param model
   * @returns void
   */
  public onEvent( input : any , forms : FormGroup , model : FormGroup ) : void
  {
    if ( typeof input === 'function' ) {
      input( forms , model ) ;
    }
  }

  /**
   * https://angular.io/guide/user-input
   * @param model
   */
  public onComplete( model : FormGroup ) : void
  {
    if ( model.valid ) {
      const payload : any = this.payload( model.value ) ;
      this.onCompleteEvent.next( payload ) ;
    } else {
      this.check$.next( true ) ;
    }
  }

  /**
   * https://angular.io/guide/user-input
   * @param input
   */
  public onClick( input : string ) : void
  {
    this.onClickEvent.next( input ) ;
  }

  /**
   * https://angular.io/api/core/OnInit
   * https://angular.io/api/core/OnInit#ngOnInit
   */
  public ngOnInit() : void
  {
    this.build() ;
    this.dates() ;
  }

  /**
   * Constructor
   * @param datepicker   https://github.com/angular/material2/blob/master/src/lib/datepicker/datepicker-intl.ts
   */
  public constructor(
    protected readonly datepicker : MatDatepickerIntl ,
  ) {
    super() ;
  }

}
