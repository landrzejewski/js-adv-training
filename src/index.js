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

    const subtractTaxes = (data) => data[1].reduce((result, tax) => result - result * (tax / 100), data[0]);

    const value$ = observeInput('#value', 'keyup')
        .pipe(rxjs.debounceTime(1_000));

    const taxes$ = rxjs.combineLatest(observeCheckbox('#vat', 'click'), observeCheckbox('#cit', 'click'))

    const subscription = rxjs.combineLatest(value$, taxes$)
        .pipe(
            rxjs.map(subtractTaxes)
        )
        .subscribe({
            next: (value) => document.querySelector('#result').innerText = `Result: ${value}`,
            error: (error) => console.log(error)
        });

    // subscription.unsubscribe();

     rxjs.from(ajax.request({url: `http://localhost:3000/users/1`}))
         .subscribe({
             next: (value) => console.log(value),
             error: (error) => console.log(error)
         });
});
