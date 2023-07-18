"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * @author https://github.com/acvetkovk
 * @overview Manager
 */

class Manager {
  /**
   * @param {StubsCache} stub
   * @param {EventsCache} events
   * @param {PropsCache} props
   */
  constructor(stub, events, props) {
    this.__stub__ = stub;
    this.__events__ = events;
    this.__props__ = props;
    this.reset = () => {
      this.__stub__.reset();
      this.__events__.reset();
      this.__props__.reset();
    };
    this.flush = () => {
      this.__stub__.flush();
      this.__events__.flush();
      this.__props__.flush();
    };
  }
}
exports.default = Manager;