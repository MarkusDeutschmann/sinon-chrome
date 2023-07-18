"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));
var _urijs = _interopRequireDefault(require("urijs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview chrome.cookies.Cookie fake module
 */

class ChromeCookie {
  constructor(details) {
    ChromeCookie.assertParams(details);
    this.details = details;
    this.url = details.url;
  }

  /**
   * get chrome cookie value
   * @returns {Object}
   */
  get info() {
    var domain = new _urijs.default(this.details.url).hostname();
    var data = {
      name: this.details.name || '',
      value: this.details.value || '',
      domain: domain,
      hostOnly: domain.charAt(0) !== '.',
      httpOnly: Boolean(this.details.httpOnly),
      secure: Boolean(this.details.secure),
      session: (0, _isUndefined.default)(this.details.expirationDate),
      path: this.details.path || new _urijs.default(this.details.url).path()
    };
    if (this.details.expirationDate) {
      data.expirationDate = this.details.expirationDate;
    }
    return data;
  }

  /**
   * assert cookie params
   * @param {CookieDetails} details
   */
  static assertParams(details) {
    if (!details.url) {
      throw new Error('details.url required');
    }
  }
}
exports.default = ChromeCookie;