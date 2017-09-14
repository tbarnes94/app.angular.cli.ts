import { ObjectAny } from '../../../../commons';
import { CommonActionTest } from '../../../../commons/shared/store/specs/common.actions.tests';
import { CommonSuite } from '../../../../commons/specs/common.tests';
import { TRANSLATE_LANGUAGE } from '../translate.actions';
import { TranslateLanguage } from '../translate.actions';
import { TRANSLATE_TRANSLATIONS } from '../translate.actions';
import { TranslateTranslations } from '../translate.actions';

/** @exports */
const title: string = 'Translate';
const samples: string = 'en-US';

CommonSuite(title, 'TranslateLanguage', '', () => {
  CommonActionTest<TranslateLanguage, string>(TranslateLanguage, TRANSLATE_LANGUAGE, samples);
});

CommonSuite(title, 'TranslateTranslations', '', () => {
  CommonActionTest<TranslateTranslations, ObjectAny>(TranslateTranslations, TRANSLATE_TRANSLATIONS, {});
});
