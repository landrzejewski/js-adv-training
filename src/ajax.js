'use strict';

$.namespace('pl.training.ajax', (function () {
    const onReadySateChange = (xhr, onSuccess, onFailure, format) => {
        if (xhr.readyState === 4) {
            if (xhr.status > 199 && xhr.status < 300) {
                const result = format === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                onSuccess(result);
            } else {
                onFailure(xhr.status, xhr.statusText, xhr);
            }
        }
    };
    /*const request = ({method = 'GET', url, onSuccess, onFailure, format = 'json'}, data) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onreadystatechange = () => onReadySateChange(xhr, onSuccess, onFailure, format);
      xhr.send(data);
    };*/
    const request = ({method = 'GET', url, format = 'json'}, data) => {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onreadystatechange = () => onReadySateChange(xhr, resolve, reject, format);
            xhr.send(data);
        });
    }
    return {
      request
    };
})());
