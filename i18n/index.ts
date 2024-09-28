import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translationEn from './locales/en-US/translation.json';
import { Platform } from 'react-native';

const resources = {
  'en-US': { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage;

  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.localStorage) {
      savedLanguage = window.localStorage.getItem('language');
    }
  } else {
    try {
      savedLanguage = await AsyncStorage.getItem('language');
    } catch (error) {
      console.error('Error reading language from AsyncStorage:', error);
    }
  }

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: savedLanguage as string,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n().catch((error) => {
  console.error('Error initializing i18n:', error);
});

export default i18n;
