import intl from "react-intl-universal";
import Cookies from 'js-cookie';
import en from "./en";
import de from "./de";
import fr from "./fr";
import ja from "./ja";
import zh_CN from "./zh_CN";

const locales = {
  en: en,
  de: de,
  fr: fr,
  ja: ja,
  zh_CN: zh_CN,
};

const localLang = Cookies.get("lang");

const defaultLang = "en";

const lang = locales[localLang] ? localLang : defaultLang;

/**
 * Initialize properties and load CLDR locale data according to currentLocale
 * https://www.npmjs.com/package/react-intl-universal
 * @param {Object} options
 * @param {string} options.escapeHtml To escape html. Default value is true.
 * @param {string} options.currentLocale Current locale such as 'en-US'
 * @param {Object} options.locales App locale data like {"en-US":{"key1":"value1"},"zh-CN":{"key1":"值1"}}
 * @param {Object} options.warningHandler Ability to accumulate missing messages using third party services.
 * @param {string} options.fallbackLocale Fallback locale such as 'zh-CN' to use if a key is not found in the current locale
 * @returns {Promise}
 */
intl.init({
  currentLocale: lang,
  locales: locales,
});
