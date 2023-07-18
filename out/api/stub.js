"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cache = _interopRequireDefault(require("./cache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview Subs cache
 */

class StubsCache extends _cache.default {
  constructor(sinon) {
    super();
    this.stubs = Object.create(null);
    this.sinon = sinon;
  }

  /**
   * @param {String} method
   * @param {String} namespace
   * @returns {Function}
   */
  get(method, namespace) {
    var key = this.getKey(method, namespace);
    if (key in this.stubs) {
      return this.stubs[key];
    }
    var stub = this.create(key);
    this.store(key, stub);
    return stub;
  }

  /**
   * @param {String} key
   * @param {Function} stub
   */
  store(key, stub) {
    this.stubs[key] = stub;
  }

  /**
   * @param {String} key
   * @returns {Function}
   */
  create(key) {
    var stub = this.sinon.stub();
    stub.flush = () => {
      this.deleteStub(key);
    };
    return stub;
  }

  /**
   * @param {String} key
   */
  deleteStub(key) {
    if (key in this.stubs) {
      delete this.stubs[key];
    }
  }

  /**
   * Flush sinon stubs (replace by new)
   */
  flush() {
    this.stubs = Object.create(null);
    this.sinon.restore();
  }

  /**
   * Reset sinon stubs
   */
  reset() {
    Object.keys(this.stubs).forEach(key => {
      this.stubs[key].resetHistory();
      this.stubs[key].resetBehavior();
    });
    this.sinon.restore();
  }
}
exports.default = StubsCache;