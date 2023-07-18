"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * @author https://github.com/acvetkov
 * @overview SourcePanel
 */

class SourcePanel {
  /**
   * @param {StubsCache} stubs
   * @param {EventsCache} events
   * @param {PropsCache} props
   * @param {String} namespace
   */
  constructor(stubs, events, props, namespace) {
    this.stub = stubs;
    this.events = events;
    this.namespace = namespace;
  }
  get() {
    return {
      createSidebarPane: this.stub.get('createSidebarPane', this.namespace),
      onSelectionChanged: this.events.get('onSelectionChanged', this.namespace)
    };
  }
}
exports.default = SourcePanel;