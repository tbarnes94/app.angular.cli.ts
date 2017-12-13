/**
 * @param input
 * @param duration
 * @returns boolean
 */
export function isExpired( input : Date , duration : number ) : boolean
{
  const stamp : number = input.getTime() ;
  const now : number = new Date().getTime() ;
  return ( now > ( stamp + duration ) ) ;
}
