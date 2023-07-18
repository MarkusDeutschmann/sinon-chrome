"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * @author https://github.com/acvetkov
 * @overview StorageArea
 */

class StorageArea {
  /**
   * @param {StubsCache} stubs
   * @param {EventsCache} events
   * @param {PropsCache} props
   * @param {String} namespace
   */
  constructor(stubs, events, props, namespace) {
    this.stubs = stubs;
    this.namespace = namespace;
  }
  get() {
    return {
      get: this.stubs.get('get', this.namespace),
      getBytesInUse: this.stubs.get('getBytesInUse', this.namespace),
      set: this.stubs.get('set', this.namespace),
      remove: this.stubs.get('remove', this.namespace),
      clear: this.stubs.get('clear', this.namespace)
    };
  }
}
exports.default = StorageArea;