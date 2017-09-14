import { CommonSuite } from '../../../specs/common.tests';
import { COMMON_LOADER } from '../common.actions';
import { CommonLoader } from '../common.actions';
import { CommonActionTest } from './common.actions.tests';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonActions';

CommonSuite(title, subtitle, '', () => {
  CommonActionTest<CommonLoader, boolean>(CommonLoader, COMMON_LOADER, true);
});
