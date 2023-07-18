"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stableApiApps = _interopRequireDefault(require("../config/stable-api-apps.json"));
var _api = _interopRequireDefault(require("../api"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview Apps entry point
 */
var _default = new _api.default(_stableApiApps.default).create();
exports.default = _default;