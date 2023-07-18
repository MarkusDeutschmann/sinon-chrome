"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stableApi = _interopRequireDefault(require("../config/stable-api.json"));
var _api = _interopRequireDefault(require("../api"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview Extensions entry point
 */
var _default = new _api.default(_stableApi.default).create();
exports.default = _default;