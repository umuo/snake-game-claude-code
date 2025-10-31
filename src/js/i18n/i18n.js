/**
 * Internationalization (i18n) module
 * Manages language switching and translation
 */

import { zhCN } from './zh-CN.js';
import { enUS } from './en-US.js';

class I18n {
  constructor() {
    this.languages = {
      'zh-CN': zhCN,
      'en-US': enUS,
    };

    // Default to Chinese
    this.currentLanguage = 'zh-CN';

    // Try to load saved language from localStorage
    const savedLanguage = localStorage.getItem('snake-game-language');
    if (savedLanguage && this.languages[savedLanguage]) {
      this.currentLanguage = savedLanguage;
    }
  }

  /**
   * Get translation for a key
   * @param {string} key - Translation key (e.g., 'title', 'controls.title')
   * @returns {string} Translated text
   */
  t(key) {
    const keys = key.split('.');
    let value = this.languages[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value || key;
  }

  /**
   * Get current language code
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Set current language
   * @param {string} lang - Language code
   */
  setLanguage(lang) {
    if (this.languages[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('snake-game-language', lang);
      return true;
    }
    return false;
  }

  /**
   * Get list of available languages
   * @returns {Array} Array of language codes
   */
  getAvailableLanguages() {
    return Object.keys(this.languages);
  }

  /**
   * Get language name for a code
   * @param {string} code - Language code
   * @returns {string} Language name
   */
  getLanguageName(code) {
    const names = {
      'zh-CN': '中文',
      'en-US': 'English',
    };
    return names[code] || code;
  }
}

// Create singleton instance
export const i18n = new I18n();
