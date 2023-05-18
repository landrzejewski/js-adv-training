// (x, y) => x + y ------> (x) => (y) => x + y

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

const addOne = (value) => value + 1;
const square = (value) => value ** 2;
const add = (firstValue, secondValue) => firstValue + secondValue;
const isEven = (value) => value % 2 === 0;
const newAdd = curry(add);
const numbers = [1, 2, 3];

// const addOneAndSquare = (value) => square(addOne(value));
const addOneAndSquare = compose(square, addOne);
console.log(addOneAndSquare(2));

console.log(newAdd(1)(3));

const evenNumber = filter(isEven, numbers);
const processedNumbers = map(addOne, evenNumber);
const sum = reduce(add, 0, processedNumbers);

console.log(sum);
