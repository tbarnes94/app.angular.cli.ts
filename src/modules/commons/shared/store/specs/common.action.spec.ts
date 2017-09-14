import { CommonSuite } from '../../../specs/common.tests';
import { CommonAction as Action } from '../common.action';
import { CommonActionTest } from './common.actions.tests';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonAction';

CommonSuite(title, subtitle, '', () => {
  CommonActionTest<Action<boolean>, boolean>(Action, undefined, true);
});
