"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = require("lodash");
var _index = _interopRequireDefault(require("../events/index"));
var _cache = _interopRequireDefault(require("./cache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview Events cache
 */

class EventsCache extends _cache.default {
  constructor(sinon) {
    super();
    this.events = Object.create(null);
    this.sandbox = sinon.createSandbox();
  }

  /**
   * @param {String} type
   * @param {String} namespace
   * @returns {ChromeEvent}
   */
  get(type, namespace) {
    var key = this.getKey(type, namespace);
    if (key in this.events) {
      return this.events[key];
    }
    var event = this.createEvent();
    this.events[key] = event;
    return event;
  }

  /**
   * Remove all listeners
   */
  reset() {
    this.sandbox.resetHistory();
    this.sandbox.resetBehavior();
    (0, _lodash.forEach)(this.events, event => {
      event.removeListeners();
    });
  }

  /**
   * Drop listeners
   */
  flush() {
    this.reset();
  }

  /**
   * Create event
   * @returns {ChromeEvent}
   */
  createEvent() {
    var event = new _index.default();
    this.sandbox.spy(event, 'addListener');
    this.sandbox.spy(event, 'hasListener');
    this.sandbox.spy(event, 'removeListener');
    this.sandbox.spy(event, 'removeListeners');
    return event;
  }
}
exports.default = EventsCache;