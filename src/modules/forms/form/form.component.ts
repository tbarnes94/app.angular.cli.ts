/** @imports */
import { Component } from '@angular/core' ;
import { EventEmitter } from '@angular/core' ;
import { Input } from '@angular/core' ;
import { Output } from '@angular/core' ;
import { ViewEncapsulation } from '@angular/core' ;
import { FormControl } from '@angular/forms' ;
import { FormGroup } from '@angular/forms' ;
import { BehaviorSubject } from 'rxjs/Rx' ;

import { CommonComponent } from '../../commons' ;
import { FormSchemas } from '../shared/types/form/form.schemas' ;
import { FormControl as FormControlSchema } from '../shared/types/form/form.schemas' ;
import { FormGroup as FormGroupSchema } from '../shared/types/group/form.group' ;
import { FormSection as FormSectionSchema } from '../shared/types/group/form.section' ;

/**
 * https://angular.io/api/core/Component
 */
@Component
({
  selector : 'forms-form' ,
  encapsulation : ViewEncapsulation.Emulated ,
  styleUrls : [ './form.component.styl' ] ,
  template :
  `
    <!-- forms -->
    <form
      [formGroup]='this.model'
      (ngSubmit)='this.onComplete( this.model )'
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
              *ngIf=
              '(
                sup.section &&
                this.toBoolean( sup.shown , this.model , true )
              )'
              fxLayoutWrap
              [fxLayout]='"row"'
              [fxLayout.lt-sm]='"column"'
              [fxFlex]='"0 0 calc(" + sup.width + ")"'
              >
              <ng-container *ngFor='let sub of sup.children' >
                <forms-group
                  *ngIf='this.toBoolean( sub.shown , this.model , true )'
                  [fxFlex]='"0 0 calc(" + sub.width + ")"'
                  [model]='this.schemaz[ sec.key ].controls[ sup.key ].controls[ sub.key ]'
                  [schemas]='sub.children'
                  [id]='( sec.key + "-" + sup.key + "-" + sub.key )'
                  [label]='this.toAny( sub.label , this.model )'
                  [error]='this.toAny( sub.error , this.model )'
                  (onValueEvent)='this.onEvent( sub.onValue , this.model , $event )'
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
                [fxFlex]='"0 0 calc(" + sup.width + ")"'
                [model]='this.schemaz[ sec.key ].controls[ sup.key ]'
                [schemas]='sup.children'
                [id]='( sec.key + "-" + sup.key )'
                [label]='this.toAny( sup.label , this.model )'
                [error]='this.toAny( sup.error , this.model )'
                (onValueEvent)='this.onEvent( sup.onValue , this.model , $event )'
                [check]='( this.check$ | async )'
                [tooltip]='sup.tooltip'
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
      </div>
      <!-- footer -->
      <div>
        <ng-content
          select='.form-footer'
          >
        </ng-content>
      </div>
    </form>
  ` ,
})
export class FormsFormComponent extends CommonComponent
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
      this.onCompleteEvent.next( model ) ;
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
  }

}
