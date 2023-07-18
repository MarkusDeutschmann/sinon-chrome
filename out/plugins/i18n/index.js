"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = require("lodash");
class ChromeI18n {
  /**
   * @constructor
   * @param {Object} translations
   */
  constructor() {
    var translations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._translations = translations;
  }

  /**
   * Install plugin
   * @param {Object} chrome
   */
  install(chrome) {
    var plugin = this;
    this.chrome = chrome;
    Object.defineProperty(this.chrome, 'i18n', {
      get: function get() {
        return plugin;
      }
    });
  }

  /**
   * Get message by name and apply provided substitutions
   * @param {String} messageName
   * @param {Array} substitutions
   * @returns {String}
   */
  getMessage(messageName) {
    var {
      message = undefined,
      placeholders = {}
    } = this._translations[messageName] || {};
    for (var _len = arguments.length, substitutions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      substitutions[_key - 1] = arguments[_key];
    }
    var flattenSubstitutions = (0, _lodash.flatten)(substitutions);
    if ((0, _lodash.isEmpty)(flattenSubstitutions) || (0, _lodash.isEmpty)(placeholders)) {
      return String(message);
    }
    return message.replace(/\$([\w-]+)\$/g, (ignored, name) => {
      var {
        content
      } = placeholders[name] || {};
      if (!content) {
        return undefined;
      }
      var index = Math.max(parseInt(content.replace('$', ''), 10) - 1, 0);
      return flattenSubstitutions[index];
    });
  }

  /**
   * Get accept-languages from the browser
   * @param {Function} callback
   */
  getAcceptLanguages() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
    callback(['en-US', 'en', 'el', 'fr', 'it']);
  }

  /**
   * Get the browser UI language of the browser
   * @returns {String}
   */
  getUILanguage() {
    return 'en-US';
  }

  /**
   * Detect language from a given string
   * @param {String} text
   * @param {Function} callback
   */
  detectLanguage() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
    callback('en-US');
  }
}
exports.default = ChromeI18n;