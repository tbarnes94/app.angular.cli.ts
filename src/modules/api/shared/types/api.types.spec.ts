import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { ApiError } from './api.error';
import { ApiOptions } from './api.options';
import { ApiResponse } from './api.response';

describe('<Api>', () => {

  let outpt: ApiError
    | ApiResponse<null>
    | ApiOptions
  ;

  describe('ApiTypes', () => {
    it('should return response', fakeAsync(() => {
      outpt = new ApiError(null, null);
      outpt = new ApiResponse<null>(null, null);
      outpt = new ApiOptions();
    }));
  });

});
