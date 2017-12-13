/**
 * https://regex101.com
 */
export const AndPattern : Array<string> = [ '\\&' ] ;
export const AtsignPattern : Array<string> = [ '\\@' ] ;
export const BacktickPattern : Array<string> = [ '\\`' ] ;
export const BracketCLPattern : Array<string> = [ '\\{' ] ;
export const BracketCRPattern : Array<string> = [ '\\}' ] ;
export const BracketRLPattern : Array<string> = [ '\\(' ] ;
export const BracketRRPattern : Array<string> = [ '\\)' ] ;
export const BracketSLPattern : Array<string> = [ '\\[' ] ;
export const BracketSRPattern : Array<string> = [ '\\]' ] ;
export const CaretPattern : Array<string> = [ '\\^' ] ;
export const ColonPattern : Array<string> = [ '\\:' ] ;
export const ColonSPattern : Array<string> = [ '\\;' ] ;
export const CommaPattern : Array<string> = [ '\\,' ] ;
export const DollarPattern : Array<string> = [ '\\$' ] ;
export const ExclamationPattern : Array<string> = [ '\\!' ] ;
export const MinusPattern : Array<string> = [ '\\-' ] ;
export const PercentPattern : Array<string> = [ '\\%' ] ;
export const PeriodPattern : Array<string> = [ '\\.' ] ;
export const PlusPattern : Array<string> = [ '\\+' ] ;
export const PoundPattern : Array<string> = [ '\\#' ] ;
export const QuestionPattern : Array<string> = [ '\\?' ] ;
export const QuoteDPattern : Array<string> = [ '\\"' ] ;
export const QuoteSPattern : Array<string> = [ '\\\'' ] ;
export const SlashLPattern : Array<string> = [ '\\\\' ] ;
export const SlashRPattern : Array<string> = [ '\\/' ] ;
export const SpacePattern : Array<string> = [ '\\s' ] ;
export const StarsPattern : Array<string> = [ '\\*' ] ;
export const TildePattern : Array<string> = [ '\\~' ] ;
export const UnderPattern : Array<string> = [ '\\_' ] ;
export const PunctuatePattern : Array<string> =
[
  ...CommaPattern ,
  ...ExclamationPattern ,
  ...MinusPattern ,
  ...PeriodPattern ,
  ...QuestionPattern ,
  ...QuoteSPattern ,
  ...UnderPattern ,
] ;

/**
 * https://regex101.com
 */
export const AlphaPattern : Array<string> = [ 'A-Z' , 'a-z' ] ;
export const AlphaExtendsPattern : Array<string> = [ 'ÂÀÄÇÉÊÈËÎÏÔŒÛÙÜŸ' , 'âàäçéêèëîïôœûùüÿ' ] ;
export const AlphaAllPattern : Array<string> =
[
  ...AlphaPattern ,
  ...AlphaExtendsPattern ,
  ...MinusPattern ,
  ...SpacePattern ,
] ;

/**
 * https://regex101.com
 */
export const NumericPattern : Array<string> = [ '0-9' ] ;
export const NumericAllPattern : Array<string> =
[
  ...CommaPattern ,
  ...NumericPattern ,
  ...PeriodPattern ,
] ;

/**
 * https://regex101.com
 */
export const AlphanumericPattern : Array<string> =
[
  ...AlphaAllPattern ,
  ...NumericAllPattern ,
] ;

/**
 * https://regex101.com
 */
export const CompletePattern : Array<string> =
[
 ...AlphanumericPattern ,
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
