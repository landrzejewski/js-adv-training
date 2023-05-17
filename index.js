'use strict';

$.onReady(() => {
    const ajax = $.namespace('pl.training.ajax');
    ajax.load();
    console.log(ajax);
    $.on({selector: '#box', listener: function() { console.log(this) }});
});
