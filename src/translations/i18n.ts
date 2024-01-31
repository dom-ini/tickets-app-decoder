import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from '@/translations/en';
import pl from '@/translations/pl';

const translations = {
  en,
  pl,
};

const DEFAULT_LOCALE = 'en';

const i18n = new I18n(translations);

i18n.locale = getLocales()[0].languageCode || DEFAULT_LOCALE;
i18n.enableFallback = true;

export default i18n;
