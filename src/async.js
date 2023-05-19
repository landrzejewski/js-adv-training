'use strict';

$.onReady(() => {
    const ajax = $.namespace('pl.training.ajax');
    //$.on({selector: '#box', listener: function() { console.log(this) }});
    const onFailure = (code, description, xhr) => console.log(`Failure: ${code} ${description}`);
    const baseUrl = 'http://localhost:3000';

    // Callbacks

    /*ajax.request({
        url: `${baseUrl}/users/1`,
        onSuccess: (user) => {
            const orderId = user.orders.pop().id;
            ajax.request({
                url: `${baseUrl}/orders/${orderId}`,
                onSuccess: (order) => console.log(order),
                onFailure
            });
        },
        onFailure
    });*/

    /*const getFirstOrder = (user) => {
        const orderId = user.orders.pop().id;
        ajax.request({
            url: `${baseUrl}/orders/${orderId}`,
            onSuccess: (order) => console.log(order),
            onFailure
        });
    };

    ajax.request({
        url: `${baseUrl}/users/1`,
        onSuccess: getFirstOrder,
        onFailure
    });*/

    // Promises

    /*
        - Promise has state one of ['pending', 'fulfilled', 'rejected']
        - Promise state can change only once (is final after resolve or reject call)
        - Promise has result on of [undefined, value passed to resolve fn, error passed to reject fn]
     */

    const getFirstOrder = (user) => {
        const orderId = user.orders.pop().id;
        return ajax.request({url: `${baseUrl}/orders/${orderId}`});
    }

    ajax.request({url: `${baseUrl}/users/1`})
        .then(getFirstOrder)
        .then((order) => order.totalValue)
        .then((totalValue) => console.log(totalValue), onFailure);

    const print = (value) => {
        console.log(value);
    };

    const printError = (error) => {
        console.log(error);
    };

    // Waits for all promises to resolve (all or nothing error strategy)

    Promise.all([
        new Promise((resolve) => setTimeout(() => resolve(1), 4_000)),
        new Promise((resolve) => setTimeout(() => resolve(2), 2_000)),
        new Promise((resolve) => setTimeout(() => resolve(3), 500)),
        new Promise((resolve, reject) => setTimeout(() => reject('error'), 400))
    ])
        .then(print, printError);

    // Waits for all promises despite of result

    Promise.allSettled([
        new Promise((resolve) => setTimeout(() => resolve(1), 4_000)),
        new Promise((resolve) => setTimeout(() => resolve(2), 2_000)),
        new Promise((resolve) => setTimeout(() => resolve(3), 500)),
        new Promise((resolve, reject) => setTimeout(() => reject('error'), 400))
    ])
        .then(print);

    // Waits for first fulfilled promise

    Promise.any([
        new Promise((resolve) => setTimeout(() => resolve(1), 4_000)),
        new Promise((resolve) => setTimeout(() => resolve(2), 2_000)),
        new Promise((resolve) => setTimeout(() => resolve(3), 500)),
        new Promise((resolve, reject) => setTimeout(() => reject('error'), 400))
    ])
        .then(print, onFailure);

    const fulfilledPromise = Promise.resolve('result');
    fulfilledPromise.then(print, printError);

    const rejectedPromise = Promise.reject('error');
    rejectedPromise.then(print, printError);

    // async/await

    async function process() {
        const user = await ajax.request({url: `${baseUrl}/users/1`});  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const orderId = user.orders.pop().id;
        return await ajax.request({url: `${baseUrl}/orders/${orderId}`});
    }

    process().then(print, onFailure);

});
