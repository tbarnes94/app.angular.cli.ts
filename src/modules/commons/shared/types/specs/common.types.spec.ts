import { CommonSuite } from '../../../specs/common.tests';
import { ObjectAny } from '../object.any';
import { ObjectBooleans } from '../object.booleans';
import { ObjectStrings } from '../object.strings';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonTypes';

CommonSuite(title, subtitle, '', () => {
  let outpt: any;
  outpt = new ObjectAny();
  outpt = new ObjectBooleans();
  outpt = new ObjectStrings();
});
