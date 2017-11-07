/**
 * https://regex101.com
 */
export const SpacePattern : Array<string> = [ '\\s' ] ;
export const PunctuatePattern : Array<string> = [ '!?' , '-_' , '\',\\.' ] ;

/**
 * https://regex101.com
 */
export const AlphaPattern : Array<string> = [ 'A-Z' , 'a-z' ] ;
export const AlphaExtendsPattern : Array<string> = [ 'ÂÀÄÇÉÊÈËÎÏÔŒÛÙÜŸ' , 'âàäçéêèëîïôœûùüÿ' ] ;
export const AlphaAllPattern : Array<string> = [ ...AlphaPattern , ...AlphaExtendsPattern ] ;

/**
 * https://regex101.com
 */
export const NumericPattern : Array<string> = [ '0-9' ] ;
export const DecimalPattern : Array<string> = [ ',\\.' ] ;
export const NumericAllPattern : Array<string> = [ ...NumericPattern , ...DecimalPattern ] ;

/**
 * https://regex101.com
 */
export const AlphanumericPattern : Array<string> = [ ...AlphaAllPattern , ...NumericAllPattern , ...SpacePattern ] ;
export const CompletePattern : Array<string> = [ ...AlphanumericPattern , ...PunctuatePattern ] ;

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
