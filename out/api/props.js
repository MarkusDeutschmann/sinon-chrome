"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop = _interopRequireDefault(require("lodash/noop"));
var _cache = _interopRequireDefault(require("./cache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview Props cache
 */

class PropsCache extends _cache.default {
  constructor() {
    super();
    this.props = {};
  }

  /**
   * @param {String} prop
   * @param {String} namespace
   * @param {*} defaultValue
   * @returns {*}
   */
  get(prop, namespace, defaultValue) {
    var key = this.getKey(prop, namespace);
    if (key in this.props) {
      return this.props[key];
    }
    var property = this.create(defaultValue);
    this.props[key] = property;
    return property;
  }

  /**
   * @param {*} defaultValue
   * @returns {{default: *, current: *, flush: (function())}}
   */
  create(defaultValue) {
    return {
      default: defaultValue,
      current: defaultValue,
      flush() {
        this.current = defaultValue;
      }
    };
  }

  /**
   * Reset property to default state
   */
  reset() {
    (0, _noop.default)();
  }

  /**
   * Flush property
   */
  flush() {
    Object.keys(this.props).forEach(key => this.props[key].flush());
  }
}
exports.default = PropsCache;