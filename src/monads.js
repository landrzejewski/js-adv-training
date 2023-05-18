// Maybe

function getUser() {
    const user = {
        name: 'jan',
        address: Monet.Some('Street x') // Monet.None()
    }
    return Monet.Some(user); // Monet.None();
}

const userName = getUser()
    .map((user) => user.name)
    .map((name) => name.toUpperCase());

// console.log(userName.getOrElse('Unknown'));

const userAddress = getUser()
    .flatMap((user) => user.address);

// console.log(userAddress.getOrElse('Unknown'));

// Either

function divide(a, b) {
    if (b === 0) {
        return Monet.Left('Division by zero');
    } else {
        return Monet.Right(a / b);
    }
}

function square(value) {
    return Monet.Right(value ** 2);
}

/*
divide(2, 1)
    .flatMap(square)
    .map((result) => `Result: ${result}`)
    .forEach((element) => console.log(element));
*/

// IO

const celsiusToFahrenheit = (value) => value * 9 / 5 + 32;
const formatTemperature = (value) => `Temperature: ${value} fahrenheit`;
const readInputValue = (selector) => Monet.IO(() => document.querySelector(selector)).map((input) => input.value);
const print = (text) => Monet.IO(() => console.log(text));

const pipeline = readInputValue('#temperature')
    .map(parseFloat)
    .map(celsiusToFahrenheit)
    .map(formatTemperature)
    .flatMap(print);

document.querySelector('#convertBtn')
    .addEventListener('click', () => pipeline.run())

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
