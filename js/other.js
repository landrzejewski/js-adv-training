// Symbols https://tc39.es/ecma262/#sec-well-known-symbols

const customSymbol = Symbol('custom key');
const customSymbolAlias = customSymbol;

const otherCustomSymbol = Symbol('custom key');

console.log(customSymbol === otherCustomSymbol); // false

const account = {
  balance: 0,
  [customSymbol]: '000001'
};

console.log(account[customSymbol]);

const secondAccount = Object.assign({}, account);

account['custom key'] = 'abc';

for (let key in account) {
    console.log(`Key: ${key}`); // symbol is not visible
}
console.log(JSON.stringify(account)); // symbol is not visible
console.log(Object.keys(account)); // symbol is not visible

console.log(account[customSymbol]);
