"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extensions = _interopRequireDefault(require("./extensions"));
var _plugins = _interopRequireDefault(require("./plugins"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview Entry point
 */

_extensions.default.plugins = _plugins.default;
var _default = _extensions.default;
exports.default = _default;