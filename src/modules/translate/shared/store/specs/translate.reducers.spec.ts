import { ObjectAny } from '../../../../commons';
import { CommonReducerActionTest } from '../../../../commons/shared/store/specs/common.reducers.tests';
import { CommonReducerTest } from '../../../../commons/shared/store/specs/common.reducers.tests';
import { CommonSuite } from '../../../../commons/specs/common.tests';
import { TranslateLanguage } from '../translate.actions';
import { TranslateTranslations } from '../translate.actions';
import { translateLanguageReducer } from '../translate.reducers';
import { translateTranslationsReducer } from '../translate.reducers';
import { translateReducers as reducers } from '../translate.reducers';

/** @exports */
const title: string = 'Translate';
let subtitle: string = 'translateReducers';
const samples: string = 'en-US';

CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<any>(reducers, { language: samples, translations: null });
});

subtitle = 'translateLanguageReducer';
CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<string>(translateLanguageReducer, samples);
});

CommonSuite(title, subtitle, 'for language', () => {
  CommonReducerActionTest<TranslateLanguage, string, string>(TranslateLanguage, translateLanguageReducer, samples, samples);
});

subtitle = 'translateTranslationsReducer';
CommonSuite(title, subtitle, '', () => {
  CommonReducerTest<ObjectAny>(translateTranslationsReducer, null);
});

CommonSuite(title, subtitle, 'for translations', () => {
  CommonReducerActionTest<TranslateTranslations, ObjectAny, ObjectAny>(TranslateTranslations, translateTranslationsReducer, {}, {});
});
