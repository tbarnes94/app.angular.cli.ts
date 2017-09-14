import { CommonSuite } from '../../../specs/common.tests';
import { CommonLoader } from '../common.actions';
import { commonLoaderReducer } from '../common.reducers';
import { commonReducers as reducers } from '../common.reducers';
import { CommonReducerActionTest } from './common.reducers.tests';
import { CommonReducerTest } from './common.reducers.tests';

/** @exports */
const title: string = 'Common';
let subtitle: string = 'commonReducers';

CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<any>(reducers, { loader: true });
});

subtitle = 'commonLoaderReducer';
CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<boolean>(commonLoaderReducer, true);
});

CommonSuite(title, subtitle, 'for loads', () => {
  CommonReducerActionTest<CommonLoader, boolean, boolean>(CommonLoader, commonLoaderReducer, true, true);
});
