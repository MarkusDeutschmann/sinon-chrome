"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = require("lodash");
var _sinon = _interopRequireDefault(require("sinon"));
var _stub = _interopRequireDefault(require("./stub"));
var _events = _interopRequireDefault(require("./events"));
var _props = _interopRequireDefault(require("./props"));
var _manager = _interopRequireDefault(require("./manager"));
var _props2 = require("../utils/props");
var _chromeSettings = _interopRequireDefault(require("../types/chrome-settings"));
var _contentSettings = _interopRequireDefault(require("../types/content-settings"));
var _elementsPanel = _interopRequireDefault(require("../types/elements-panel"));
var _sourcePanel = _interopRequireDefault(require("../types/source-panel"));
var _storageArea = _interopRequireDefault(require("../types/storage-area"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author https://github.com/acvetkov
 * @overview Create api
 */

var typeMap = {
  'types.ChromeSetting': _chromeSettings.default,
  'StorageArea': _storageArea.default,
  'SourcesPanel': _sourcePanel.default,
  'ElementsPanel': _elementsPanel.default,
  'ContentSetting': _contentSettings.default
};
class Api {
  /**
   * @param {Array<Object>} config
   */
  constructor(config) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.sinon = options.sinon ? options.sinon : _sinon.default;
    this.NS_RULE = /^(.+)\.(.+)$/;
    this.config = config;
    this.stubs = new _stub.default(this.sinon);
    this.events = new _events.default(this.sinon);
    this.props = new _props.default();
    this.manager = new _manager.default(this.stubs, this.events, this.props);
  }

  /**
   * Create api stub
   * @returns {Object}
   */
  create() {
    var browserApi = (0, _lodash.reduce)(this.config, (api, data) => {
      (0, _lodash.set)(api, data.namespace, this.createInterface(data));
      return api;
    }, {});
    return (0, _lodash.assign)({
      registerPlugin(plugin) {
        plugin.install(this);
      }
    }, browserApi, this.manager);
  }

  /**
   * @param {Object} data
   * @returns {Object}
   */
  createInterface(data) {
    var {
      functions = [],
      events = [],
      namespace
    } = data;
    var result = {};
    this.createFunctions(result, functions, namespace);
    this.createEvents(result, events, namespace);
    this.createProps(result, data);
    return result;
  }

  /**
   * @param {Object} obj
   * @param {Array<Object>} functions
   * @param {String} namespace
   * @returns {Object}
   */
  createFunctions(obj, functions, namespace) {
    var stubs = this.stubs;
    return (0, _lodash.reduce)(functions, (result, func) => {
      Object.defineProperty(result, func.name, {
        get: function get() {
          return stubs.get(func.name, namespace);
        },
        enumerable: true,
        configurable: true
      });
      return obj;
    }, obj);
  }

  /**
   * @param {Object} obj
   * @param {Array<Object>} events
   * @param {String} namespace
   * @returns {Object}
   */
  createEvents(obj, events, namespace) {
    var ev = this.events;
    return (0, _lodash.reduce)(events, (result, event) => {
      Object.defineProperty(result, event.name, {
        get: function get() {
          return ev.get(event.name, namespace);
        },
        enumerable: true,
        configurable: true
      });
      return obj;
    }, obj);
  }

  /**
   * @param {Object} obj
   * @param {Object} data
   * @returns {Object}
   */
  createProps(obj, data) {
    var namespace = data.namespace;
    var nsProps = (0, _props2.getAll)(data.properties || {});
    Object.keys(nsProps).forEach(key => {
      var value = nsProps[key];
      var matches = key.match(this.NS_RULE);
      var prop = key;
      var ns = namespace;
      var propNS = namespace;
      if (matches) {
        [, ns, prop] = matches;
        propNS = "".concat(namespace, ".").concat(ns);
        var result = {};
        this.appendProp(result, prop, propNS, value);
        var localObject = (0, _lodash.get)(obj, ns);
        if (!localObject) {
          (0, _lodash.set)(obj, ns, result);
        } else {
          this.appendProp(localObject, prop, propNS, value);
        }
      } else {
        this.appendProp(obj, prop, namespace, value);
      }
    });
    return obj;
  }

  /**
   * @param {Object} obj
   * @param {String} prop
   * @param {String} namespace
   * @param {*} value
   * @returns {*}
   */
  appendProp(obj, prop, namespace, value) {
    if (value && value in typeMap) {
      var TypeClass = typeMap[value];
      var instance = new TypeClass(this.stubs, this.events, this.props, "".concat(namespace, ".").concat(prop));
      return Object.defineProperty(obj, prop, {
        get() {
          return instance.get();
        },
        enumerable: true,
        configurable: true
      });
    }
    var property = this.props.get(prop, "".concat(namespace), value);
    Object.defineProperty(obj, prop, {
      get() {
        return property.current;
      },
      set(newValue) {
        property.current = newValue;
      },
      enumerable: true,
      configurable: true
    });
  }
}
exports.default = Api;