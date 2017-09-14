import { CommonSuite } from '../../../../commons/specs/common.tests';
import { ApiError } from '../api.error';
import { ApiOptions } from '../api.options';
import { ApiResponse } from '../api.response';

/** @exports */
const title: string = 'Api';
const subtitle: string = 'ApiTypes';

CommonSuite(title, subtitle, '', () => {
  let outpt: any;
  outpt = new ApiError(null, null);
  outpt = new ApiResponse<null>(null, null);
  outpt = new ApiOptions();
});
