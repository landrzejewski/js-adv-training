import currency from './module-one.js'
//import { sayHello as greetUser } from './module-two.js'
import * as moduleTwo from './module-two.js'

console.log(`Default currency: ${currency}`);
//greetUser();
moduleTwo.sayHello();
