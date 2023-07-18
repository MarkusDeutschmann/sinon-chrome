"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview ChromeEvent class
 */

class ChromeEvent {
  /**
   * @constructor
   */
  constructor() {
    this._listeners = [];
  }

  /**
   * Manual dispatch
   */
  dispatch() {
    this.trigger.apply(this, arguments);
  }

  /**
   * Call all subscribed handlers
   */
  trigger() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    this._listeners.forEach(handler => {
      handler.apply(null, args);
    });
  }

  /**
   * Async call all subscribed handlers
   */
  triggerAsync() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    setTimeout(() => {
      this.trigger.apply(this, args);
    }, 0);
  }

  /**
   * Call all subscribed handlers, pass arguments ass array
   * @param {Array} args
   */
  applyTrigger(args) {
    this.trigger.apply(this, args);
  }

  /**
   * Async call all subscribed handlers, pass arguments ass array
   * @param {Array} args
   */
  applyTriggerAsync(args) {
    this.triggerAsync.apply(this, args);
  }

  /**
   * Add event listener
   * @param {Function} handler
   */
  addListener(handler) {
    if ((0, _isFunction.default)(handler)) {
      this._listeners.push(handler);
    }
  }

  /**
   * Remove event listener
   * @param {Function} handler
   */
  removeListener(handler) {
    var index = this._listeners.indexOf(handler);
    if (index >= 0) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Check event listener exists
   * @param {Function} handler
   * @returns {Boolean}
   */
  hasListener(handler) {
    return this._listeners.indexOf(handler) >= 0;
  }

  /**
   * Remove all listeners
   */
  removeListeners() {
    this._listeners = [];
  }
}
exports.default = ChromeEvent;