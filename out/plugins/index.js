"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cookies = _interopRequireDefault(require("./cookies"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview plugins list
 */
var _default = {
  CookiePlugin: _cookies.default,
  I18nPlugin: _i18n.default
};
exports.default = _default;