import { CommonSuite } from '../../../specs/common.tests';
import { CommonGuard as Guard } from '../common.guard';
import { CommonGuardTest } from './common.guard.tests';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonGuard';

CommonSuite(title, subtitle, 'for canActivate()', () => {
  CommonGuardTest(Guard, false);
});
