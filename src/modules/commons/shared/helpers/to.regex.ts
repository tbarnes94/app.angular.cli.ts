/**
 * https://regex101.com
 */
export const AlphaLPattern : Array<string> = [ 'a-z' ] ;
export const AlphaUPattern : Array<string> = [ 'A-Z' ] ;
export const AlphaAllPattern : Array<string> = [ ...AlphaLPattern , ...AlphaUPattern ] ;
export const ExtendsLPattern : Array<string> = [ 'âàäçéêèëîïôœûùüÿ' ] ;
export const ExtendsUPattern : Array<string> = [ 'ÂÀÄÇÉÊÈËÎÏÔŒÛÙÜŸ' ] ;
export const ExtendsAllPattern : Array<string> = [ ...ExtendsLPattern , ...ExtendsUPattern ] ;
export const DecimalPattern : Array<string> = [ ',\\.' ] ;
export const NumeralPattern : Array<string> = [ '0-9' ] ;
export const PunctuatePattern : Array<string> = [ '!?-_\',\\.' ] ;

/**
 * https://regex101.com
 */
export const GenericPattern : Array<string> =
[
  ...AlphaAllPattern ,
  ...ExtendsAllPattern ,
  ...DecimalPattern ,
  ...NumeralPattern ,
  ...PunctuatePattern ,
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
