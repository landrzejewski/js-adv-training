function* randomGenerator() {
    yield Math.random;
}

const generator = randomGenerator();

//console.log(generator.next());
//console.log(generator.next());

function* customGenerator() {
    try {
        yield 1;
        console.log('After first yield');
        yield 2;
        console.log('After second yield');
        yield* randomGenerator();
        const data = yield 3;
        console.log('After third yield');
        console.log(data);
    } catch {
        console.log('Exception')
    }
    yield 0;
}

const secondGenerator = customGenerator()
/*console.log(secondGenerator.next());
console.log(secondGenerator.next());
console.log(secondGenerator.next());
//secondGenerator.throw(new Error('Too many data'));
console.log(secondGenerator.next());
console.log(secondGenerator.next(100));*/

/*for (let result of secondGenerator) {
    console.log(result);
}*/

async function* sequence(start, stop) {
    for (let index = start; index <= stop; index++) {
        yield await new Promise((resolve) => setTimeout(() => resolve(index), 4_000));
    }
}

(async () => {
    const generator = sequence(1, 5);
    for await (let value of generator) {
        console.log(value);
    }
})();
