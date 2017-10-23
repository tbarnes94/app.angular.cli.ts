/** @imports */
import { toEpoch } from './to.epoch' ;

/**
 * @param input
 * @param duration
 * @returns boolean
 */
export function isExpired( input : Date , duration : number ) : boolean
{
  const stamp : number = toEpoch( input ) ;
  const now : number = toEpoch( new Date() ) ;
  return ( now > ( stamp + duration ) ) ;
}
