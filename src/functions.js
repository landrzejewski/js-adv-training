/*
A function is a process which takes some input, called arguments, and produces some output called a return value.

Alonzo Church invented lambda calculus - universal model of computation based on function application.
Basic assumptions:
1. Functions are always anonymous. In JavaScript we can express this with anonymous function expression like (x, y) => x + y.
2. Functions in lambda calculus are always unary - they only accept a single parameter. The n-ary function
(x, y) => x + y can be expressed as curried function (x) => (y) => x + y.
3. Functions are first-class elements - can be used as inputs to other functions, and can return functions as result.

Pure function
1. Given the same input, will always return the same output.
2. Produces no side effects - can’t alter any external state and promotes immutability.

Functional programming is a programming paradigm where applications are composed using pure functions,
avoiding shared mutable state and side-effects. Functional programming is usually more declarative
than imperative, meaning that we express what to do rather than how to do it.

A higher order function is any function which takes a function as an argument, returns a function,
or both. Higher order functions are often used to:

• Abstract or isolate actions, effects, or async flow control using callback functions, promises, monads, etc.
• Create utilities which can act on a wide variety of data types
• Partially apply a function to its arguments or create a curried function for the purpose of reuse or function composition
• Take a list of functions and return some composition of those input functions

One of the most important aspect of fp is immutability, this can be achieved with tools like:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
https://immutable-js.com

*/

//const compose = (f, g) => (x) => f(g(x));
const compose = (...fns) => (x) => fns.reduceRight((x, f) => f(x), x);
const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    }
};
const reduce = (reducer, initialValue, arr) => {
    if (arr.length === 0) {
        return initialValue;
    } else {
        const [head, ...tail] = arr;
        const result = reducer(initialValue, head);
        return reduce(reducer, result, tail);
    }
};
const map = (mapper, arr) => reduce((result, element) => [...result, mapper(element)], [], arr);
const filter = (predicate, arr) => reduce((result, element) => predicate(element) ? [...result,element] : result, [], arr);
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
const flip = (fn) => (a) => (b) => fn(b)(a);

const addOne = (value) => value + 1;
const square = (value) => value ** 2;
const add = (firstValue, secondValue) => firstValue + secondValue;
const isEven = (value) => value % 2 === 0;
const newAdd = curry(add);
const addTwo = newAdd(2); // partial application
const numbers = [1, 2, 3];

// const addOneAndSquare = (value) => square(addOne(value));
const addOneAndSquare = compose(square, addOne);
console.log(addOneAndSquare(2));

console.log(newAdd(1)(3));

const evenNumber = filter(isEven, numbers);
const processedNumbers = map(addOne, evenNumber);
const sum = reduce(add, 0, processedNumbers);
console.log(sum);

