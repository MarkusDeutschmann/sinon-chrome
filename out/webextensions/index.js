"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stableApiFf = _interopRequireDefault(require("../config/stable-api-ff.json"));
var _api = _interopRequireDefault(require("../api"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview Firefox's WebExtensions api
 */
var _default = new _api.default(_stableApiFf.default).create();
exports.default = _default;