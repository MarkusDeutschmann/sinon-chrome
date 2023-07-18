"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;
var _lodash = require("lodash");
/**
 * @author https://github.com/acvetkov
 * @overview props utils
 */

/**
 * Collect all props namespaces
 * @param {Object} props
 * @param {String} namespace
 * @returns {Object}
 */
function getAll(props) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (0, _lodash.reduce)(props, (result, data, prop) => {
    var ns = namespace ? "".concat(namespace, ".").concat(prop) : "".concat(prop);
    if ((0, _lodash.isPlainObject)(data.properties) && (0, _lodash.isPlainObject)(data.value)) {
      return (0, _lodash.assign)({}, result, getAll(data.properties, ns));
    }
    result["".concat(ns)] = getValue(data.value, data.$ref);
    return result;
  }, {});
}

/**
 * @param {*} val
 * @param {String} ref
 * @returns {*}
 */
function getValue(val, ref) {
  if (ref) {
    return ref;
  }
  if (!val || typeof val === 'object') {
    return null;
  }
  return val;
}