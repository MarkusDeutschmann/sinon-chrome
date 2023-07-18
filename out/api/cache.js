"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * @author https://github.com/acvetkov
 * @overview Base cache class
 */

class BaseCache {
  /**
   * @param {String} prop
   * @param {String} namespace
   * @returns {string}
   */
  getKey(prop, namespace) {
    return "".concat(namespace, ".").concat(prop);
  }
}
exports.default = BaseCache;