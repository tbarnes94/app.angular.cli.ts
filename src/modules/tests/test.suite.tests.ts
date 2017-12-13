/** @imports */
import { fakeAsync } from '@angular/core/testing' ;

/** @exports */
export function TestEmpty() : void {}

/** @exports */
export function TestSuite(
  title : string ,
  subtitle : string ,
  description : string ,
  input : Function ,
  one : any = TestEmpty ,
  two : any = TestEmpty ,
)
: void
{
  describe( `<${title}>` , () =>
  {
    describe( subtitle , () =>
    {
      beforeEach( one ) ;
      it( `should return response ${description}` , fakeAsync( input ) ) ;
      afterEach( two ) ;
    }) ;

  }) ;

}
