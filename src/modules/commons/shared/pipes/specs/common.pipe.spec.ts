import { CommonSuite } from '../../../specs/common.tests';
import { CommonPipe as Pipe } from '../common.pipe';
import { CommonPipeTest } from './common.pipe.tests';

/** @exports */
const title: string = 'Common';
const subtitle: string = 'CommonPipe';
const samples: string = 'kuwas';

CommonSuite(title, subtitle, 'for transform()', () => {
  CommonPipeTest(Pipe, samples, samples, true);
});
