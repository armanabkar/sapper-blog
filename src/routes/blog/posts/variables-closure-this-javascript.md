---
title: Variable Declaration, Closure and "this" in JavaScript
date: "2020-10-26T08:38:00.000Z"
---

In this article, we’re going to learn about Scope & Closures in JavaScript ... 

<!-- more -->

<h2 align="center">
  <img src="https://miro.medium.com/max/800/1*bxEkHw1xewxOFjmGunb-Cw.png" width="600px" />
  <br>
</h2>

# var vs let vs const in JavaScript

ES2015 (or ES6) introduced two new ways to create variables, ```let``` and ```const```. But before we actually dive into the differences between ```var```, ```let```, and ```const```, there are some prerequisites you need to know first. They are variable declarations vs initialization, scope (specifically function scope), and hoisting.

## Variable Declaration vs Initialization
A variable declaration introduces a new identifier.

```javascript
var declaration
```

Above we create a new identifier called declaration. In JavaScript, variables are initialized with the value of ```undefined``` when they are created. What that means is if we try to log the ```declaration``` variable, we’ll get ```undefined```.

```javascript
var declaration

console.log(declaration) // undefined
```

So if we log the declaration variable, we get undefined.

In contrast to variable declaration, variable initialization is when you first assign a value to a variable.

```javascript
var declaration

console.log(declaration) // undefined

declaration = 'This is an initialization'
```

So here we’re initializing the ```declaration``` variable by assigning it to a string.

This leads us to our second concept, Scope.

## Scope
Scope defines where variables and functions are accessible inside of your program. In JavaScript, there are two kinds of scope - global scope, and function scope. According to the official spec,

> “If the variable statement occurs inside a FunctionDeclaration, the variables are defined with function-local scope in that function.”.

What that means is if you create a variable with ```var```, that variable is “scoped” to the function it was created in and is only accessible inside of that function or, any nested functions.

```javascript
function getDate () {
  var date = new Date()

  return date
}

getDate()
console.log(date) // ❌ Reference Error
```

Above we try to access a variable outside of the function it was declared. Because ```date``` is “scoped” to the ```getData``` function, it’s only accessible inside of ```getDate``` itself or any nested functions inside of ```getDate``` (as seen below).

```javascript
function getDate () {
  var date = new Date()

  function formatDate () {
    return date.toDateString().slice(4) // ✅
  }

  return formatDate()
}

getDate()
console.log(date) // ❌ Reference Error
```

Now let’s look at a more advanced example. Say we had an array of ```prices``` and we needed a function that took in that array as well as a ```discount``` and returned us a new array of discounted prices. The end goal might look something like this.

```javascript
discountPrices([100, 200, 300], .5) // [50, 100, 150]
```

And the implementation might look something like this

```javascript
function discountPrices (prices, discount) {
  var discounted = []

  for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount)
    var finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }

  return discounted
}
```

Seems simple enough but what does this have to do with block scope? Take a look at that ```for``` loop. Are the variables declared inside of it accessible outside of it? Turns out, they are.

```javascript
function discountPrices (prices, discount) {
  var discounted = []

  for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount)
    var finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }

  console.log(i) // 3
  console.log(discountedPrice) // 150
  console.log(finalPrice) // 150

  return discounted
}
```

If JavaScript is the only programming language you know, you may not think anything of this. However, if you’re coming to JavaScript from another programming language, specifically a programming language that is blocked scope, you’re probably a little bit concerned about what’s going on here. It’s not really broken, it’s just kind of weird. There’s not really a reason to still have access to ```i```, ```discountedPrice```, and ```finalPrice``` outside of the ```for``` loop. It doesn’t really do us any good and it may even cause us harm in some cases. However, since variables declared with ```var``` are function scoped, you do.

Now that we’ve discussed variable declarations, initializations, and scope, the last thing we need to flush out before we dive into ```let``` and ```const``` is hoisting.

## Hoisting
Remember earlier we said that “In JavaScript, variables are initialized with the value of ```undefined``` when they are created.”. Turns out, that’s all that “Hoisting” is. The JavaScript interpreter will assign variable declarations a default value of ```undefined``` during what’s called the “Creation” phase.

> For a much more in depth guide on the Creation Phase, Hoisting, and Scopes see “The Ultimate Guide to Hoisting, Scopes, and Closures in JavaScript”

Let’s take a look at the previous example and see how hoisting affects it.

```javascript
function discountPrices (prices, discount) {
  var discounted = undefined
  var i = undefined
  var discountedPrice = undefined
  var finalPrice = undefined

  discounted = []
  for (i = 0; i < prices.length; i++) {
    discountedPrice = prices[i] * (1 - discount)
    finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }

  console.log(i) // 3
  console.log(discountedPrice) // 150
  console.log(finalPrice) // 150

  return discounted
}
```

Notice all the variable declarations were assigned a default value of ```undefined```. That’s why if you try access one of those variables before it was actually declared, you’ll just get ```undefined```.

```javascript
function discountPrices (prices, discount) {
  console.log(discounted) // undefined

  var discounted = []

  for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount)
    var finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }

  console.log(i) // 3
  console.log(discountedPrice) // 150
  console.log(finalPrice) // 150

  return discounted
}
```

Now that you know everything there is to know about ```var```, let’s finally talk about the whole point of why you’re here, what’s the difference between ```var```, ```let```, and ```const```?

## var VS let VS const
First, let’s compare ```var``` and ```let```. The main difference between ```var``` and ```let``` is that instead of being function scoped, ```let``` is block scoped. What that means is that a variable created with the ```let``` keyword is available inside the “block” that it was created in as well as any nested blocks. When I say “block”, I mean anything surrounded by a curly brace ```{}``` like in a ```for``` loop or an ```if``` statement.

So let’s look back to our ```discountPrices``` function one last time.

```javascript
function discountPrices (prices, discount) {
  var discounted = []

  for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount)
    var finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }

  console.log(i) // 3
  console.log(discountedPrice) // 150
  console.log(finalPrice) // 150

  return discounted
}
```

Remember that we were able to log ```i```, ```discountedPrice```, and ```finalPrice``` outside of the ```for``` loop since they were declared with ```var``` and ```var``` is function scoped. But now, what happens if we change those ```var``` declarations to use ```let``` and try to run it?

```javascript
function discountPrices (prices, discount) {
  let discounted = []

  for (let i = 0; i < prices.length; i++) {
    let discountedPrice = prices[i] * (1 - discount)
    let finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }

  console.log(i)
  console.log(discountedPrice)
  console.log(finalPrice)

  return discounted
}

discountPrices([100, 200, 300], .5) // ❌ ReferenceError: i is not defined
```

🙅‍We get ```ReferenceError: i is not defined```. What this tells us is that variables declared with ```let``` are block scoped, not function scoped. So trying to access ```i``` (or ```discountedPrice``` or ```finalPrice```) outside of the “block” they were declared in is going to give us a reference error as we just barely saw.

```
var VS let

var: function scoped

let: block scoped
```

The next difference has to do with Hoisting. Earlier we said that the definition of hoisting was “The JavaScript interpreter will assign variable declarations a default value of ```undefined``` during what’s called the ‘Creation’ phase.” We even saw this in action by logging a variable before it was declared (you get ```undefined```)

```javascript
function discountPrices (prices, discount) {
  console.log(discounted) // undefined

  var discounted = []

  for (var i = 0; i < prices.length; i++) {
    var discountedPrice = prices[i] * (1 - discount)
    var finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }

  console.log(i) // 3
  console.log(discountedPrice) // 150
  console.log(finalPrice) // 150

  return discounted
}
```

I can’t think of any use case where you’d actually want to access a variable before it was declared. It seems like throwing a ReferenceError would be a better default than returning ```undefined```. In fact, this is exactly what ```let``` does. If you try to access a variable declared with ```let``` before it’s declared, instead of getting ```undefined``` (like with those variables declared with ```var```), you’ll get a ReferenceError.

```javascript
function discountPrices (prices, discount) {
  console.log(discounted) // ❌ ReferenceError

  let discounted = []

  for (let i = 0; i < prices.length; i++) {
    let discountedPrice = prices[i] * (1 - discount)
    let finalPrice = Math.round(discountedPrice * 100) / 100
    discounted.push(finalPrice)
  }

  console.log(i) // 3
  console.log(discountedPrice) // 150
  console.log(finalPrice) // 150

  return discounted
}
```

```
var VS let

var:
  function scoped
  undefined when accessing a variable before it's declared

let:
  block scoped
  ReferenceError when accessing a variable before it's declared
```

## let VS const
Now that you understand the difference between ```var``` and ```let```, what about ```const```? Turns out, ```const``` is almost exactly the same as ```let```. However, the only difference is that once you’ve assigned a value to a variable using ```const```, you can’t reassign it to a new value.

```javascript
let name = 'Tyler'
const handle = 'tylermcginnis'

name = 'Tyler McGinnis' // ✅
handle = '@tylermcginnis' // ❌ TypeError: Assignment to constant variable.
```

The take away above is that variables declared with ```let``` can be re-assigned, but variables declared with ```const``` can’t be.

Cool, so anytime you want a variable to be immutable, you can declare it with ```const```. Well, not quite. Just because a variable is declared with ```const``` doesn’t mean it’s immutable, all it means is the value can’t be re-assigned. Here’s a good example.

```javascript
const person = {
  name: 'Kim Kardashian'
}

person.name = 'Kim Kardashian West' // ✅

person = {} // ❌ Assignment to constant variable.
```

Notice that changing a property on an object isn’t reassigning it, so even though an object is declared with ```const```, that doesn’t mean you can’t mutate any of its properties. It only means you can’t reassign it to a new value.

---

Now the most important question we haven’t answered yet, should you use ```var```, ```let```, or ```const```? The most popular opinion, and the opinion that I subscribe to, is that you should always use ```const``` unless you know the variable is going to change. The reason for this is by using ```const```, you’re signalling to your future self as well as any other future developers that have to read your code that this variable shouldn’t change. If it will need to change (like in a ```for``` loop), you should use ```let```.

So between variables that change and variables that don’t change, there’s not much left. That means you shouldn’t ever have to use ```var``` again.

Now the unpopular opinion, though it still has some validity to it, is that you should never use ```const``` because even though you’re trying to signal that the variable is immutable, as we saw above, that’s not entirely the case. Developers who subscribe to this opinion always use ```let``` unless they have variables that are actually constants like ```_LOCATION_ = ....```

So to recap, ```var``` is function scoped and if you try to use a variable declared with ```var``` before the actual declaration, you’ll just get ```undefined```. ```const``` and ```let``` are blocked scoped and if you try to use variable declared with ```let``` or ```const``` before the declaration you’ll get a ReferenceError. Finally the difference between ```let``` and ```const``` is that once you’ve assigned a value to ```const```, you can’t reassign it, but with ```let```, you can.


### var VS let VS const

var:
- function scoped
- undefined when accessing a variable before it's declared

let:
-  block scoped
-  ReferenceError when accessing a variable before it's declared

const:
- block scoped
- ReferenceError when accessing a variable before it's declared
- can't be reassigned

# “this” Keyword in JavaScript

In this article, we’re going to learn about the JavaScript keyword ```this``` and how the value of ```this``` is assigned in different scenarios. The best way to digest the content of this article is by quickly executing the code snippet in your browser’s console. Follow the below steps to launch the console in your Chrome browser:

- Open new tab in Chrome
- Right click on page, and select “inspect element” from the context menu
- Go to the console panel
- Start executing the JavaScript code
  
Objects are the basic building blocks in JavaScript. There’s one special object available in JavaScript, the ```this``` object. You can see the value of ```this``` at every line of JavaScript execution. The value of ```this``` is decided based on how the code is being executed.

Before getting started with ```this```, we need to understand a little about the JavaScript runtime environment and how a JavaScript code is executed.

## Execution Context
The environment (or scope) in which the line is being executed is known as the execution context. The JavaScript runtime maintains a stack of these execution contexts, and the execution context present at the top of this stack is the one currently being executed. The object ```this``` refers to changes every time the execution context is changed.

## “this” Refers to a Global Object
By default, the execution context for an execution is global — which means if a code is being executed as part of a simple function call, then ```this``` refers to a global object.
The ```window``` object is the global object in the case of the browser. And in a NodeJS environment, a special object called ```global``` will be the value of ```this```.

For example:

```javascript
function foo () {
	console.log("Simple function call");
	console.log(this === window); 
}

foo();	//prints true on console
console.log(this === window) //Prints true on console.
```

### Immediately Invoked Function Expression (IIFE)

```javascript
(function(){
	console.log("Anonymous function invocation");
	console.log(this === window);
})();
// Prints true on console
```

If strict mode is enabled for any function, then the value of ```this``` will be marked as ```undefined``` as in strict mode. The global object refers to ```undefined``` in place of the ```windows``` object.

For example:

```javascript
function foo () {
	'use strict';
	console.log("Simple function call")
	console.log(this === window); 
}

foo();	//prints false on console as in “strict mode” value of “this” in global execution context is undefined.
```

```foo();``` prints false into the console since in strict mode the value of this in a global-execution context is ```undefined```.

## “this” Refers to a New Instance
When a function is invoked with the ```new``` keyword, then the function is known as a constructor function and returns a new instance. In such cases, the value of ```this``` refers to a newly created instance.

For example:

```javascript
function Person(fn, ln) {
	this.first_name = fn;
	this.last_name = ln;

	this.displayName = function() {
		console.log(`Name: ${this.first_name} ${this.last_name}`);
	}
}

let person = new Person("John", "Reed");
person.displayName();  // Prints Name: John Reed
let person2 = new Person("Paul", "Adams");
person2.displayName();  // Prints Name: Paul Adams
```

In the case of ```person.displayName```, ```this``` refers to a new instance person, and in case of ```person2.displayName()```, ```this``` refers to ```person2``` (which is a different instance than ```Person```).

## “this” Refers to an Invoker Object (Parent Object)
In JavaScript, the property of an object can be a method or a simple value. When an object’s method is invoked, then ```this``` refers to the object which contains the method being invoked.

In this example, we’re going to use the method ```foo``` as defined in the first example.

```javascript
function foo () {
	'use strict';
	console.log("Simple function call")
	console.log(this === window); 
}

let user = {
	count: 10,
	foo: foo,
	foo1: function() {
		console.log(this === window);
	}
}

user.foo()  // Prints false because now “this” refers to user object instead of global object.
let fun1 = user.foo1;
fun1() // Prints true as this method is invoked as a simple function.
user.foo1()  // Prints false on console as foo1 is invoked as a object’s method
```

```user.foo()``` prints false because now ```this``` refers to the user object instead of the global object.

```javascript
function foo () {
	'use strict';
	console.log("Simple function call")
	console.log(this === window); 
}

let user = {
	count: 10,
	foo: foo,
	foo1: function() {
		console.log(this === window);
	}
}

user.foo()  // Prints false because now “this” refers to user object instead of global object.
let fun1 = user.foo1;
fun1() // Prints true as this method is invoked as a simple function.
user.foo1()  // Prints false on console as foo1 is invoked as a object’s method
```

With the above example, it’s clear how the value of ```this``` can be confusing in some cases.

The function definition of ```foo1``` is the same, but when it’s being called as a simple function call, then ```this``` refers to a global object. And when the same definition is invoked as an object’s method, then ```this``` refers to the parent object. So the value of ```this``` depends on how a method is being invoked.

## “this” With the Call and Apply Methods
A function in JavaScript is also a special type of object. Every function has ```call```, ```bind```, and ```apply``` methods. These methods can be used to set a custom value to ```this``` in the execution context of the function.

We’re going to use the second example defined above to explain the use of ```call```:

```javascript
function Person(fn, ln) {
	this.first_name = fn;
	this.last_name = ln;

	this.displayName = function() {
		console.log(`Name: ${this.first_name} ${this.last_name}`);
	}
}

let person = new Person("John", "Reed");
person.displayName(); // Prints Name: John Reed
let person2 = new Person("Paul", "Adams");
person2.displayName(); // Prints Name: Paul Adams

person.displayName.call(person2); // Here we are setting value of this to be person2 object
//Prints Name: Paul Adams
```

The only difference between the ```call``` and ```apply``` methods is the way an argument is passed. In the case of ```apply```, the second argument is an array of arguments, whereas in the case of the ```call``` method, the arguments are passed individually.

## “this” With the Bind Method
The ```bind``` method returns a new method with ```this``` referring to the first argument passed. We’re going to use the above example to explain the ```bind``` method.

```javascript
function Person(fn, ln) {
	this.first_name = fn;
	this.last_name = ln;

	this.displayName = function() {
		console.log(`Name: ${this.first_name} ${this.last_name}`);
	}
}

let person = new Person("John", "Reed");
person.displayName(); // Prints Name: John Reed
let person2 = new Person("Paul", "Adams");
person2.displayName(); // Prints Name: Paul Adams

let person2Display = person.displayName.bind(person2);  // Creates new function with value of “this” equals to person2 object
person2Display(); // Prints Name: Paul Adams
```

## “this” With the Fat-Arrow Function
As part of ES6, a new way was introduced to define a function.

```javascript
let displayName = (fn, ln) => {
console.log(Name: ${fn} ${ln});
};
```

When a fat arrow is used, it doesn’t create a new value for ```this```. ```this``` keeps on referring to the same object it’s referring to outside of the function.

Let’s look at some more examples to test our knowledge of ```this```.

```javascript
function multiply(p, q, callback) {
	callback(p * q);
}

let user = {
	a: 2,
	b:3,
	findMultiply: function() {
		multiply(this.a, this.b, function(total) {
			console.log(total);
			console.log(this === window);
		})
	}
}

user.findMultiply();
//Prints 6
//Prints true
```

Since the callback is invoked as a simple function call inside a multiple function, ```this``` refers to the global object ```windows``` inside the execution context of the callback method.

```javascript
var count = 5;
function test () {
	console.log(this.count === 5);
}

test() // Prints true as “count” variable declaration happened in global execution context so count will become part of global object.
```

```test()``` prints true as the ```count``` variable declaration happened in the global execution context, so ```count``` will become part of the global object.

## Summary

So now you can figure out the value of ```this``` by following these simple rules:
- By default, ```this``` refers to a global object, which is global in the case of NodeJS and a ```window``` object in the case of a browser
- When a method is called as a property of an object, then ```this``` refers to the parent object
- When a function is called with the ```new``` operator, then ```this``` refers to the newly created instance
- When a function is called using the ```call``` and ```apply``` methods, then ```this``` refers to the value passed as the first argument of the ```call``` or ```apply``` method
As you’ve seen above, the value of this can sometimes be confusing, but the above rules can help you to figure out the value of this.

# JavaScript Closure 

A closure is a stateful function that is returned by another function. It acts as a container to remember variables and parameters from its parent scope even if the parent function has finished executing. Consider this simple example.

```javascript
function sayHello() {
  const greeting = "Hello World";

  return function() { // anonymous function/nameless function
    console.log(greeting)
  }
}

const hello = sayHello(); // hello holds the returned function
hello(); // -> Hello World
```
Look! we have a function that returns a function! The returned function gets saved to a variable and invoked the line below.

## Many ways to write the same code!
Now that you know what a closure is at a basic level, here are few ways to write the same code as above.

```javascript
// original
function sayHello() {
  const greeting = "Hello World";

  return function() { // anonymous function
    console.log(greeting)
  }
}


// #1
function sayHello() {
  const greeting = "Hello World";

  return function hello() { // named function
    console.log(greeting)
  }
}


// #2
function sayHello() {
  const greeting = "Hello World";

  function hello() { // named function
    console.log(greeting)
  }

  return hello; // return inner function on a different line
}


// #3
function sayHello() {
  const greeting = "Hello World";
  const hello = () => { // arrow function
    console.log(greeting)
  }

  return hello;
}
```
Pick a style you like the most and stick with it because every one of the above variations will still print the same result!
```javascript
const hello = sayHello();
hello(); // -> Hello World
```
 

## Benefits of closure and how it can be practical
 

### Private Namespace
It's cool that the inner function remembers the environment that it was created in but what use does it have? A couple. First, it can keep your variables private. Here is the classic counter example.

```javascript
function counter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  }
}


const increment = counter();
console.log(increment()); // 1
console.log(increment()); // 2
console.log(count) // Reference error: count is not defined
```

Trying to access the count variable gives us a reference error because it's not exposed to the global environment. Which helps us reduce bugs because our state is more strictly controlled by specific methods.

### Reusable states
Because 'count' is privately scoped, we can create different instances of counter functions and their 'count' variables won't overlap!

```javascript
function counter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  }
}

const incrementBananaCount = counter();
const incrementAppleCount = counter();
console.log(incrementBananaCount()); // 1
console.log(incrementBananaCount()); // 2
console.log(incrementAppleCount()); // 1
```

### Module design pattern
The module design pattern is a popular convention to architect your JavaScript apps. It utilizes IIFE(Immediately Invoked Function Expression) to return objects and exposes only the variables and methods that you want to make public.
```javascript
let Dog1 = (function() {
  let name = "Suzy";

  const getName = () => {
    return name;
  }

  const changeName = (newName) => {
    name = newName;
  }

  return {
    getName: getName,
    changeName: changeName
  }
}())

console.log(name); // undefined
Dog1.getName() // Suzy
Dog1.changeName("Pink")
Dog1.getName() // Pink
```
As soon as this code runs, the function executes and returns an object which gets saved to Dog1. This pattern goes back to keeping our namespace private and only revealing what we want as public methods and variables via form of an object. The state is encapsulated!

 

## The famous interview question
What's the outcome of running the following function?
```javascript
for(var i=0; i<5; i++) {
  setTimeout(function() {
    console.log(i)
  }, 1000)
}
```
Why is this such a popular interview question? Because it tests your knowledge of function scope/block scope, closure, setTimeout and anonymous function! The answer prints out five 5s after 1 second.
```bash
5
5
5
5
5
```
How? Well, setTimeout runs 5 times in the loop after 1 second. After the time delay, they execute functions inside, which simply logs out i. By the time 1 second has passed, the loop already finished and i became 5. Five 5s get printed out. Not what you were expecting? You probably want to see number 1 through 5 iteratively.

## The solution
There are a few solutions, but let's focus on using closure!
```javascript
for(var i=0; i<5; i++) {
  setTimeout((function(index) {
    return function() {
      console.log(index);
    }
  }(i)), 1000)
}
```
We have our closure that is returned by an anonymous function to receive current 'i's as arguments and output them as 'index'. This in doing so captures the current variable i to each function. The result turns out to be
```bash
0 (...1000ms have passed)
1 (...1000ms have passed)
2 (...1000ms have passed)
3 (...1000ms have passed)
4 (...1000ms have passed)
5 (loop exits)
```

Congratulations! 🎉🎉 Now you are more prepared for your next interview! 😉 Just remember that closure is a function that has access to the scope that encloses that function.

---

[Source I](https://ui.dev/var-let-const/) - [Source II](https://medium.com/better-programming/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8) - [Source III](https://dev.to/shimphillip/javascript-closure-simply-explained-1f79)