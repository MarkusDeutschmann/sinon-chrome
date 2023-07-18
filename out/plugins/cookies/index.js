"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _find = _interopRequireDefault(require("lodash/find"));
var _filter = _interopRequireDefault(require("lodash/filter"));
var _findIndex = _interopRequireDefault(require("lodash/findIndex"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _urijs = _interopRequireDefault(require("urijs"));
var _cookie = _interopRequireDefault(require("./cookie"));
var _events = _interopRequireDefault(require("../../events"));
var assert = _interopRequireWildcard(require("./assert"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview ChromeCookies
 */

class ChromeCookies {
  constructor() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this._state = state;
    this.onChanged = new _events.default();
  }

  /**
   * Install plugin
   * @param {Object} chrome
   */
  install(chrome) {
    var plugin = this;
    this.chrome = chrome;
    Object.defineProperty(this.chrome, 'cookies', {
      get: function get() {
        return plugin;
      }
    });
  }

  /**
   * get cookie by criteria
   * @param {Object} details
   * @param {String} details.url
   * @param {String} details.name
   * @param {Function} callback
   * @returns {*}
   */
  get(details, callback) {
    assert.get.apply(null, arguments);
    var params = {
      name: details.name,
      domain: new _urijs.default(details.url).hostname()
    };
    return this._invokeResult((0, _find.default)(this._state, params) || null, callback);
  }

  /**
   * get all cookie list by criteria
   * @param {AllCookieCriteria} details
   * @param {Function} callback
   * @returns {*}
   */
  getAll(details, callback) {
    assert.getAll.apply(this, arguments);
    var params = details;
    if (params.url) {
      params.domain = new _urijs.default(details.url).hostname();
      delete params.url;
    }
    return this._invokeResult((0, _filter.default)(this._state, params), callback);
  }

  /**
   * set cookie value
   * @param {ChromeCookie} details
   * @param {Function} callback
   */
  set(details, callback) {
    assert.set.apply(null, arguments);
    var cookie = new _cookie.default(details);
    var cookieInfo = cookie.info;
    this._appendCookie(cookieInfo);
    this._invokeResult(cookieInfo, callback);
  }

  /**
   * remove cookie
   * @param {Object} details
   * @param {String} details.url
   * @param {String} details.name
   * @param {Function} [callback]
   */
  remove(details, callback) {
    assert.remove.apply(null, arguments);
    var params = {
      name: details.name,
      domain: new _urijs.default(details.url).hostname()
    };
    var cookieInfo = (0, _find.default)(this._state, params);
    if (cookieInfo) {
      var index = (0, _find.default)(this._state, cookieInfo);
      this._state.splice(index, 1);
      this._triggerChange({
        cause: 'explicit',
        removed: true,
        cookie: cookieInfo
      });
    }
    this._invokeResult(details, callback);
  }

  /**
   * Append new cookie
   * @param {Object} cookieInfo
   * @private
   */
  _appendCookie(cookieInfo) {
    var index = (0, _findIndex.default)(this._state, {
      name: cookieInfo.name,
      domain: cookieInfo.domain
    });
    if (index >= 0) {
      this._state.splice(index, 1, cookieInfo);
      this._triggerChange({
        cause: 'overwrite',
        removed: true,
        cookie: cookieInfo
      });
      this._triggerChange({
        cause: 'explicit',
        removed: false,
        cookie: cookieInfo
      });
    } else {
      this._state.push(cookieInfo);
      this._triggerChange({
        cause: 'explicit',
        removed: false,
        cookie: cookieInfo
      });
    }
  }

  /**
   * Trigger change event
   * @param {Object} changeInfo
   * @private
   */
  _triggerChange(changeInfo) {
    this.onChanged.triggerAsync(changeInfo);
  }

  /**
   * Async invoke result
   * @param {*} result
   * @param {Function} callback
   * @private
   */
  _invokeResult(result, callback) {
    if ((0, _isFunction.default)(callback)) {
      setTimeout(() => callback(result), 0);
    }
  }

  /**
   * @returns {Object}
   */
  get state() {
    return this._state;
  }

  /**
   * @param {Object} value
   */
  set state(value) {
    this._state = value;
  }
}
exports.default = ChromeCookies;