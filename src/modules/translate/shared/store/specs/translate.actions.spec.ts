import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

import { TRANSLATE_LANGUAGE } from '../translate.actions';
import { TranslateLanguage } from '../translate.actions';
import { TRANSLATE_TRANSLATIONS } from '../translate.actions';
import { TranslateTranslations } from '../translate.actions';
import { TranslateActions } from '../translate.actions';

describe('<Translate>', () => {

  let action: TranslateActions;
  const value: string = 'en-US';

  describe('TranslateLanguage', () => {
    it('should return response', fakeAsync(() => {
      action = new TranslateLanguage(value);
      expect(action.type).toEqual(TRANSLATE_LANGUAGE);
      expect(action.payload).toEqual(value);
    }));
  });

  describe('TranslateTranslations', () => {
    it('should return response', fakeAsync(() => {
      action = new TranslateTranslations({ value: value });
      expect(action.type).toEqual(TRANSLATE_TRANSLATIONS);
      expect(action.payload.value).toEqual(value);
    }));
  });

});
