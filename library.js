'use strict';

const LIBRARY = (function (window, undefined) {
    const version = '1.0';
    const moduleSeparator = '.';
    const rootNamespace = {};
    const getVersion = () => `Version ${version}`;
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
        const namespaceParts = name.split(moduleSeparator);
        const namespaceContent = (index) => index === namespaceParts.length - 1 ? module : {};
        const prepareNamespace = (namespace, part, index) => addProperty(namespace, part, namespaceContent(index))[part];
        return namespaceParts.reduce(prepareNamespace, rootNamespace);
    }

    console.log('Initializing LIBRARY');

    return {
        version, // version: version
        getVersion,
        on,
        onReady,
        namespace
    };
})(window, undefined);

const $ = LIBRARY;
