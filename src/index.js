'use strict';

$.onReady(() => {
    const ajax = $.namespace('pl.training.ajax');
    //$.on({selector: '#box', listener: function() { console.log(this) }});
    const onFailure = (code, description, xhr) => console.log(`Failure: ${code} ${description}`);
    const baseUrl = 'http://localhost:3000';

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

    const getFirstOrder = (user) => {
        const orderId = user.orders.pop().id;
        ajax.request({
            url: `${baseUrl}/orders/${orderId}`,
            onSuccess: (order) => console.log(order),
            onFailure
        });
    }

    ajax.request({
        url: `${baseUrl}/users/1`,
        onSuccess: getFirstOrder,
        onFailure
    });
});
