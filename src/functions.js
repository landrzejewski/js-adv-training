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
const trace = (label) => (value) => {
    console.log(`${label}: ${value}`);
    return value;
};

// const addOneAndSquare = (value) => square(addOne(value));
const addOneAndSquare = compose(square, addOne);
console.log(addOneAndSquare(2));
const addOneAndSquareWithTrace = pipe(square, trace("after square"), addOne, trace("after add"));
console.log(addOneAndSquareWithTrace(2));

console.log(newAdd(1)(3));

const evenNumber = filter(isEven, numbers);
const processedNumbers = map(addOne, evenNumber);
const sum = reduce(add, 0, processedNumbers);
console.log(sum);

/*
A functor data type is something you can map over. It’s a container which has a map operation
which can be used to apply a function to the values inside it. When you see a functor datatype, you
should think “mappable”. In JavaScript, functor types are typically represented as an object with a
.map() method that maps from inputs to outputs, e.g., Arrays, promises, streams, trees, objects, etc.

Functors are great for several reasons:
• The details of the underlying data structure implementation are abstracted away. Users don’t
need to know if iteration is required, or how it’s handled if it is. You can map over arrays,
streams, trees, or anything else.
• Functors hide the types of the data they contain, which allows you to act on the containers
using generic functions, without caring about what you’re storing inside them. You don’t need
special arrays for numbers, and special arrays for strings. Instead, you pass functions into map()
that can deal with the type contained inside the functor.
• Mapping over an empty functor is the same as mapping over a functor containing many items.
Switching logic is not needed in the case of an empty collection, and there’s no need to keep
track of iteration state if the data structure enumerates over a collection of items.
• Most importantly, functors allow you to easily compose functions over the data inside.

The functor laws:
- Identity - if you pass the identity function (x) => x into a.map(), where a is any functor type, the result should
be equivalent to a.
- Composition - functors must obey the composition law: a.map(g).map(f) is equivalent to a.map(x => f(g(x))).
 */

console.log(numbers, numbers.map((x) => x));

const compositeMapper = compose((number) => number * 3, (number) => number * 2);
console.log(numbers.map((number) => number * 2).map((number) => number * 3), numbers.map(compositeMapper))


const Box = (value) => ({
    map: (fn) => Box(fn(value)),
    toString: () => value
});

const box = Box(1);

console.log(box.toString(), box.map((x) => x).toString());

console.log(box.map((number) => number * 2).map((number) => number * 3).toString(), box.map(compositeMapper).toString())

/*
A monad is a way of composing functions that require context in addition to the return value, such as computation, branching, or effects.

Monads are needed because lots of functions aren’t simple mappings from a => b. Some functions
need to deal with side effects (promises, streams), handle branching (Maybe), deal with exceptions
(Either), etc…

Monad is composed from (functor extension):
• bind: A type lift a => M(a)
• map: The application of a function a => M(b) inside the monad context, which yields M(M(b))
• flatten: The unwrapping of one layer of monadic context: M(M(b)) => M(b)

Combination of map and flatten is flatMap.

Monads must satisfy three laws (axioms), collectively known as the monad laws:
• Left identity: unit(x).flatMap(f) ==== f(x)
• Right identity: m.flatMap(unit) ==== m
• Associativity: m.flatMap(f).flatMap(g) ==== m.flatMap(x => f(x).flatMap(g))
*/

const Monad = (value) => ({
    flatMap: (fn) => fn(value),
    map (fn) {
        return this.flatMap((x) => Monad.of(fn(a)));
    },
    toString: () => value
});

Monad.bind = (x) => Monad(x);

Monad(21)
    .map(addTwo)
    .flatMap((x) => Monad.bind(x + 1))
    .map(square);
