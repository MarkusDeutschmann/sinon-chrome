"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.getAll = getAll;
exports.remove = remove;
exports.set = set;
var _isString = _interopRequireDefault(require("lodash/isString"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview Assertation module for chrome.cookies.* methods
 */

/**
 * assert chrome.cookies.get arguments
 * @param {CookieCriteria} details
 * @param {Function} callback
 * @throws TypeError
 */
function get(details, callback) {
  if (!(0, _isString.default)(details.name)) {
    throwError('name');
  }
  if (!(0, _isString.default)(details.url)) {
    throwError('url');
  }
  if (!(0, _isFunction.default)(callback)) {
    throwError('callback');
  }
}

/**
 * assert chrome.cookie.getAll arguments
 * @param {AllCookieCriteria} details
 * @param {Function} callback
 */
function getAll(details, callback) {
  if (!(0, _isPlainObject.default)(details)) {
    throwError('details');
  }
  if (!(0, _isFunction.default)(callback)) {
    throwError('callback');
  }
}

/**
 * assert chrome.cookies.set arguments
 * @param {AllCookieCriteria} details
 */
function set(details) {
  if (!(0, _isString.default)(details.url)) {
    throwError('url');
  }
}

/**
 * assert chrome.cookies.remove arguments
 * @param {Object} details
 */
function remove(details) {
  if (!(0, _isString.default)(details.url)) {
    throwError('url');
  }
  if (!(0, _isString.default)(details.name)) {
    throwError('name');
  }
}

/**
 * throws type error
 * @param {String} argument
 */
function throwError(argument) {
  throw new Error("".concat(argument, " required"));
}