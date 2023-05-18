'use strict';

function Account(balance = 0) {
    if (!(this instanceof Account)) {
        return new Account(balance);
    }
    this.balance = balance;
}

// Shared elements

Account.prototype.getDescription = function () {
    return `Account has balance ${this.balance}`;
}

// Static elements

Account.DEFAULT_CURRENCY = 'PLN';

Account.getDescription = function () {
    return 'Account constructor';
}

// Inheritance

function PremiumAccount() {
    // method override
    this.getDescription = function () {
        // Account.prototype.getDescription(); // parent access
        return `PremiumAccount has balance ${this.balance}`;
    }
}

PremiumAccount.prototype = new Account();

const account = new Account();
console.log(account.getDescription());

const premiumAccount = new PremiumAccount(9);
console.log(premiumAccount.getDescription());

const extend = (function () {
    const TemporaryConstructor = function () {};
    return function (Child, Parent) {
        TemporaryConstructor.prototype = Parent.prototype;
        Child.prototype = new TemporaryConstructor();
        Child.parent = Parent.prototype;
        Child.prototype.constructor = Child;
    };
})();

function Shape(name = 'not set') {
    this.name = name;
}

Shape.prototype.getDescription = function () {
    return `Name: ${this.name}`;
};

function Circle(name) {
    Shape.call(this, name);
}

extend(Circle, Shape);

const circle = new Circle('first');
console.log(circle.getDescription());
console.log(`Is Shape: ${circle instanceof Shape}`);
console.log(`Is Circle: ${circle instanceof Circle}`);

// Mix-ins

const nameMixin = {
    name: 'unknown',
    print: function () {
        console.log(this.name);
    }
};

const product = {
    price: 199
};

const mix = (destination, source) => Object.assign({}, destination, source);
    // Object.keys(source).forEach((key) => destination[key] = source[key]);
    // ({ ...destination, ...source });

const newProduct = mix(product, nameMixin);
newProduct.name = 'Laptop';
newProduct.print();









