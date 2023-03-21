/**
 * @author https://github.com/acvetkovk
 * @overview Chrome apps test
 */

import _ from 'lodash';

import apiConfig from '../apps-config';
import chrome from '../../src/apps';

import generateMethodsSuite from './chrome.methods.test';
import generateEventsSuite from './chrome.events.test';
import generatePropertiesSuite from './chrome.properties.test';

/**
 * Root suite
 */
describe('apps', function () {
    checkChromeObject();
});

/**
 * Check chrome object
 */
function checkChromeObject() {
    _.forEach(apiConfig, (data, namespace) => {
        checkNamespace(data, namespace, 'apps chrome');
    });
}

/**
 * Check namespace
 * @param {Object} data
 * @param {string} data.methods
 * @param {string} data.properties
 * @param {string} data.events
 * @param {String} namespace
 * @param {String} prefix
 */
function checkNamespace({methods, properties, events}, namespace, prefix) {
    describe(`apps chrome.${namespace}`, function () {
        generateMethodsSuite(chrome, methods, namespace, prefix);
        generateEventsSuite(chrome, events, namespace, prefix);
        generatePropertiesSuite(chrome, properties, namespace, prefix);
    });
}
