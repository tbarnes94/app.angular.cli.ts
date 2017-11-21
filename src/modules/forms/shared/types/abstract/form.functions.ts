/** @imports */
import { FormGroup } from '@angular/forms' ;

/**
 * https://angular.io/api/forms/ReactiveFormsModule
 */
export type FormAny = ( forms : FormGroup ) => any ;
export type FormBoolean = ( forms : FormGroup ) => boolean ;
export type FormVoid = ( forms : FormGroup , model : FormGroup ) => void ;
