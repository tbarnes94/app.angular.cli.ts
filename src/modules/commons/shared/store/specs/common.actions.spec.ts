import { CommonSuite } from '../../../specs/common.tests';
import { COMMON_ERROR } from '../common.actions';
import { CommonError } from '../common.actions';
import { COMMON_LOADER } from '../common.actions';
import { CommonLoader } from '../common.actions';
import { COMMON_COMPLETE } from '../common.actions';
import { CommonComplete } from '../common.actions';
import { CommonActionTest } from './common.actions.tests';

/** @exports */
const title: string = 'Common';

CommonSuite(title, 'CommonError', '', () => {
  CommonActionTest<CommonError, string>(CommonError, COMMON_ERROR, null);
});

CommonSuite(title, 'CommonLoader', '', () => {
  CommonActionTest<CommonLoader, boolean>(CommonLoader, COMMON_LOADER, true);
});

CommonSuite(title, 'CommonComplete', '', () => {
  CommonActionTest<CommonComplete, any>(CommonComplete, COMMON_COMPLETE, null);
});
