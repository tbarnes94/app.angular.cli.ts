/** @imports */
import { registerLocaleData } from '@angular/common' ;

import { default as EnglishCanada } from '@angular/common/locales/en-CA' ;
import { default as EnglishCanadaExtra } from '@angular/common/locales/extra/en-CA' ;
import { default as FrenchCanadaExtra } from '@angular/common/locales/extra/fr-CA' ;
import { default as FrenchCanada } from '@angular/common/locales/fr-CA' ;

/** @exports */
export function TranslateLocales() : void
{
  registerLocaleData( EnglishCanada , EnglishCanadaExtra ) ;
  registerLocaleData( FrenchCanada , FrenchCanadaExtra ) ;
}
