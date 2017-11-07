/**
 * https://regex101.com
 */
export const AlphabetL : string = 'a-z' ;
export const AlphabetU : string = 'A-Z' ;
export const AlphabetA : Array<string> = [ AlphabetL , AlphabetU ] ;
export const AlphabetExtendedL : string = 'âàäçéêèëîïôœûùüÿ' ;
export const AlphabetExtendedU : string = 'ÂÀÄÇÉÊÈËÎÏÔŒÛÙÜŸ' ;
export const AlphabetExtendedA : Array<string> = [ AlphabetExtendedL , AlphabetExtendedU ] ;
export const Numeral : string = '0-9' ;
export const NumeralDecimal : string = ',\\.' ;
export const Puntuation : string = '!?-_\',\\.' ;

/**
 * https://regex101.com
 */
export const Generic : Array<string> =
[
  Puntuation ,
  ...AlphabetA ,
  ...AlphabetExtendedA ,
  Numeral ,
  NumeralDecimal ,
] ;

/**
 * @param input
 */
export function toRegexGroup( input : Array<string> ) : Array<string>
{
  return [ '^' , '[' , ...input , ']+' , '$' ] ;
}

/**
 * @param input
 * @param options
 * @returns RegExp
 */
export function toRegex( input : Array<string> , options : string = '' ) : RegExp
{
  const regex : string = input.join( '' ) ;
  return new RegExp( regex , options ) ;
}
