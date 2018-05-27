import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang;
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang;

import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);

// Ready translated locale messages
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
  },
};

// Number localization
const numberFormats = {
  en: {
    currency: {
      style: 'currency', currency: 'USD',
    },
  },
  zh: {
    currency: {
      style: 'currency', currency: 'CNY', currencyDisplay: 'symbol',
    },
  },
};

// DateTime localization
/** 可配置项
 * Property       Values
 *   weekday        "narrow", "short", "long"
 *   era            "narrow", "short", "long"
 *   year           "2-digit", "numeric"
 *   month          "2-digit", "numeric", "narrow", "short", "long"
 *   day            "2-digit", "numeric"
 *   hour           "2-digit", "numeric"
 *   minute         "2-digit", "numeric"
 *   second         "2-digit", "numeric"
 *   timeZoneName   "short", "long"
 */
const dateTimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',

      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  zh: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',

      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // 12/24 小时制
    },
  },
};

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', // set locale
  fallbackLocale: 'zh', // fallback localization
  numberFormats,
  dateTimeFormats,
  messages, // set locale messages
});

export default i18n;
