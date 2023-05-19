'use strict';

$.onReady(() => {
    const ajax = $.namespace('pl.training.ajax');
    const observeInput = (selector, eventName) => {
        const subject = new rxjs.Subject();
        $.on({
            selector, eventName, listener: function () {
                subject.next(this.value);
            }
        });
        return subject;
    };
    const observeCheckbox = (selector, eventName) => {
        const subject = new rxjs.BehaviorSubject(0);
        $.on({
            selector, eventName, listener: function () {
                const value = this.checked ? this.value : 0;
                subject.next(value);
            }
        });
        return subject;
    };

    const values = observeInput('#value', 'keyup')
        .pipe(rxjs.debounceTime(1_000));

    rxjs.combineLatest(observeCheckbox('#vat', 'click'), observeCheckbox('#cit', 'click'))
      .subscribe({
        next: (value) => console.log(value),
        error: (error) => console.log(error)
    });


});
