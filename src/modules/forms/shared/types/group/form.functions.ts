/** @imports */
import { FormGroup } from '@angular/forms' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export type FormShown =
  ( model : FormGroup ) => boolean
  | boolean
  ;

export type FormLabel =
  ( model : FormGroup ) => string
  | string
  ;
