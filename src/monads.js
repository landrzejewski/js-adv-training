// Maybe

function getUser() {
    const user = {
        name: 'jan',
        address: Maybe.from('Street x')
    }
    return Maybe.from(user);
}

const userName = getUser()
    .map((user) => user.name)
    .map((name) => name.toUpperCase())
    .fold(
        () => console.log("Unknown"),
        (name) => console.log(`Name: ${name}`)
    );

const userAddress = getUser()
    .flatMap((user) => user.address)
    .fold(
        () => console.log("Unknown"),
        (address) => console.log(`Address: ${address}`)
    );

// Either

function divide(a, b) {
    if (b === 0) {
        return Either.Left('Division by zero');
    } else {
        return Either.Right(a / b);
    }
}

function square(value) {
    return Either(value ** 2);
}


divide(2, 1)
    .flatMap(square)
    .map((result) => `Result: ${result}`)
    .fold(
        () => console.log("Unknown"),
        result => console.log(`Result: ${result}`)
    );


// IO

const celsiusToFahrenheit = (value) => value * 9 / 5 + 32;
const formatTemperature = (value) => `Temperature: ${value} fahrenheit`;
const readInputValue = (selector) => IO(() => document.querySelector(selector)).map((input) => input.value);
const print = (text) => IO(() => console.log(text));

const pipeline = readInputValue('#temperature')
    .map(parseFloat)
    .map(celsiusToFahrenheit)
    .map(formatTemperature)
    .flatMap(print);

 document.querySelector('#convertBtn')
     .addEventListener('click', () => pipeline.run())

const add = (firstValue, secondValue) => firstValue + secondValue;
const concat = (io1, io2, combinator) => io1.flatMap((value) => io2.map((secondValue) => combinator(value, secondValue)));

const test = concat(IO.of(2), IO.of(3), add)
    .map((value) => value ** 2);
console.log(test.run());



/*
Napisz kalkulator podatkowy :), który pozwoli na określenie całkowitej kwoty podatku do zapłacenia.
Założenia:
-podatków może być kilka - trzeba je wszystkie uwzględnić
-sposób naliczania podatku może się zmienić w przyszłości (zmiana zasad, nowe podatki)
-występują ulgi/odpisy od podatku
-każda operacja (naliczenie podatku/ulgi) powinna być logowana na konsoli
-dane źródłowe wprowadzane są przez stronę (inputs), ostateczny wynik wyświetl na stronie

Wykorzystaj podejście funkcyjne i poznane typy monad (Maybe/Either, IO)
*/
