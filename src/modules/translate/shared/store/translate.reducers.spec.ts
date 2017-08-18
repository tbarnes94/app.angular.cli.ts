import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { TranslateLanguage } from './translate.actions';
import { TranslateTranslations } from './translate.actions';
import { TranslateActions } from './translate.actions';
import { translateLanguageReducers } from './translate.reducers';
import { translateTranslationsReducers } from './translate.reducers';
import { translateReducers as Reducers } from './translate.reducers';

describe('<Translate>', () => {

  let state: any;
  let action: TranslateActions;
  const value: string = 'en-US';

  describe('translateReducers', () => {
    it('should return response', fakeAsync(() => {
      state = Reducers({}, { type: null, payload: null });
    }));
  });

  describe('translateTranslationsReducers', () => {

    it('should return response', fakeAsync(() => {
      state = translateTranslationsReducers(null, { type: null, payload: null });
      expect(state).toBeNull();
    }));

    it('should return response for translations', fakeAsync(() => {
      action = new TranslateTranslations({ value: value });
      state = translateTranslationsReducers(undefined, action);
      expect(state.value).toEqual(value);
    }));

  });

  describe('translateLanguageReducers', () => {

    it('should return response', fakeAsync(() => {
      state = translateLanguageReducers(null, { type: null, payload: null });
      expect(state).toBeNull();
    }));

    it('should return response for language', fakeAsync(() => {
      action = new TranslateLanguage(value);
      state = translateLanguageReducers(undefined, action);
      expect(state).toEqual(value);
    }));

  });

});
