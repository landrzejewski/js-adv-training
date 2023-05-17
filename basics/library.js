'use strict';

const LIBRARY = (function (window, undefined) {
    const VERSION = '1.0';
    const MODULE_SEPARATOR = '.';
    const ROOT_NAMESPACE = {};
    const getVersion = () => `Version ${VERSION}`;
    const addListener = (target, eventName, listener, context) => target.addEventListener(eventName, listener.bind(context || target));
    const forEachElement = (selector, task) => document.querySelectorAll(selector).forEach(task);
    const on = ({selector, eventName = 'click', listener, context}) => forEachElement(selector, (target) => addListener(target, eventName, listener, context));
    const onReady = (listener) => addListener(window, 'DOMContentLoaded', () => listener(LIBRARY));
    const addProperty = (object, key, value) => {
        if (!object.hasOwnProperty(key)) {
            object[key] = value;
        }
        return object;
    };
    const namespace = (name, module) => {
        const namespaceParts = name.split(MODULE_SEPARATOR);
        const namespaceContent = (index) => index === namespaceParts.length - 1 ? module : {};
        const prepareNamespace = (namespace, part, index) => addProperty(namespace, part, namespaceContent(index))[part];
        return namespaceParts.reduce(prepareNamespace, ROOT_NAMESPACE);
    }

    console.log('Initializing LIBRARY');

    return {
        VERSION, // VERSION: VERSION
        getVersion,
        on,
        onReady,
        namespace
    };
})(window, undefined);

const $ = LIBRARY;
