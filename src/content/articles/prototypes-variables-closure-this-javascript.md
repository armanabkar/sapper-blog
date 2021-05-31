---
title: Prototypes, Variable Declaration, Closure and "this" in JavaScript
date: "2020-10-26T08:38:00.000Z"
---

In this article, we’re going to learn about Prototypes, Scope & Closures in JavaScript ... 

<!-- more -->

<h2 align="center">
  <img src="https://miro.medium.com/max/800/1*bxEkHw1xewxOFjmGunb-Cw.png" width="600px" />
  <br>
</h2>

# ```var``` vs ```let``` vs ```const```

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

---

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

---

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

# Prototypes

You can’t get very far in JavaScript without dealing with objects. They’re foundational to almost every aspect of the JavaScript programming language. In this post you’ll learn about a variety of patterns for instantiating new objects and in doing so, you’ll be gradually led to understanding JavaScript’s prototype in depth.

You can't get very far in JavaScript without dealing with objects. They're foundational to almost every aspect of the JavaScript programming language. In fact, learning how to create objects is probably one of the first things you studied when you were starting out. With that said, in order to most effectively learn about prototypes in JavaScript, we're going to channel our inner Jr. developer and go back to the basics.

Objects are key/value pairs. The most common way to create an object is with curly braces ```{}``` and you add properties and methods to an object using dot notation.

```javascript
let animal = {}
animal.name = 'Leo'
animal.energy = 10

animal.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

animal.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

animal.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}
```

Simple. Now odds are in our application we'll need to create more than one animal. Naturally the next step for this would be to encapsulate that logic inside of a function that we can invoke whenever we needed to create a new animal. We'll call this pattern ```Functional Instantiation``` and we'll call the function itself a "constructor function" since it's responsible for "constructing" a new object.

### Functional Instantiation

```javascript
function Animal (name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy

  animal.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }

  animal.sleep = function (length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }

  animal.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)
```

> "I thought this was an Advanced JavaScript course...?" - Your brain
 
It is. We'll get there.

Now whenever we want to create a new animal (or more broadly speaking a new "instance"), all we have to do is invoke our ```Animal``` function, passing it the animal's ```name``` and ```energy``` level. This works great and it's incredibly simple. However, can you spot any weaknesses with this pattern? The biggest and the one we'll attempt to solve has to do with the three methods - ```eat```, ```sleep```, and ```play```. Each of those methods are not only dynamic, but they're also completely generic. What that means is that there's no reason to re-create those methods as we're currently doing whenever we create a new animal. We're just wasting memory and making each animal object bigger than it needs to be. Can you think of a solution? What if instead of re-creating those methods every time we create a new animal, we move them to their own object then we can have each animal reference that object? We can call this pattern ```Functional Instantiation with Shared Methods```, wordy but descriptive 🤷‍♂️.

### Functional Instantiation with Shared Methods

```javascript
const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  },
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function Animal (name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy
  animal.eat = animalMethods.eat
  animal.sleep = animalMethods.sleep
  animal.play = animalMethods.play

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)
```

By moving the shared methods to their own object and referencing that object inside of our ```Animal``` function, we've now solved the problem of memory waste and overly large animal objects.

### Object.create

Let's improve our example once again by using ```Object.create```. Simply put, Object.create allows you to create an object which will delegate to another object on failed lookups. Put differently, Object.create allows you to create an object and whenever there's a failed property lookup on that object, it can consult another object to see if that other object has the property. That was a lot of words. Let's see some code.

```javascript
const parent = {
  name: 'Stacey',
  age: 35,
  heritage: 'Irish'
}

const child = Object.create(parent)
child.name = 'Ryan'
child.age = 7

console.log(child.name) // Ryan
console.log(child.age) // 7
console.log(child.heritage) // Irish
```

So in the example above, because ```child``` was created with ```Object.create(parent)```, whenever there's a failed property lookup on ```child```, JavaScript will delegate that lookup to the ```parent``` object. What that means is that even though ```child``` doesn't have a ```heritage``` property, ```parent``` does so when you log ```child.heritage``` you'll get the ```parent```'s heritage which was ```Irish```.

Now with ```Object.create``` in our tool shed, how can we use it in order to simplify our ```Animal``` code from earlier? Well, instead of adding all the shared methods to the animal one by one like we're doing now, we can use Object.create to delegate to the ```animalMethods``` object instead. To sound really smart, let's call this one ```Functional Instantiation with Shared Methods and Object.create``` 🙃

### Functional Instantiation with Shared Methods and Object.create

```javascript
const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  },
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function Animal (name, energy) {
  let animal = Object.create(animalMethods)
  animal.name = name
  animal.energy = energy

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)
```

📈 So now when we call ```leo.eat```, JavaScript will look for the ```eat``` method on the ```leo``` object. That lookup will fail, then, because of Object.create, it'll delegate to the ```animalMethods``` object which is where it'll find ```eat```.

So far, so good. There are still some improvements we can make though. It seems just a tad "hacky" to have to manage a separate object (```animalMethods```) in order to share methods across instances. That seems like a common feature that you'd want to be implemented into the language itself. Turns out it is and it's the whole reason you're here - ```prototype```.

So what exactly is ```prototype``` in JavaScript? Well, simply put, every function in JavaScript has a ```prototype``` property that references an object. Anticlimactic, right? Test it out for yourself.

```javascript
function doThing () {}
console.log(doThing.prototype) // {}
```

What if instead of creating a separate object to manage our methods (like we're doing with ```animalMethods```), we just put each of those methods on the ```Animal``` function's prototype? Then all we would have to do is instead of using Object.create to delegate to ```animalMethods```, we could use it to delegate to ```Animal.prototype```. We'll call this pattern ```Prototypal Instantiation```.

### Prototypal Instantiation

```javascript
function Animal (name, energy) {
  let animal = Object.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  return animal
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)
```

👏👏👏 Hopefully you just had a big "aha" moment. Again, ```prototype``` is just a property that every function in JavaScript has and, as we saw above, it allows us to share methods across all instances of a function. All our functionality is still the same but now instead of having to manage a separate object for all the methods, we can just use another object that comes built into the ```Animal``` function itself, ```Animal.prototype```.

## Let's. Go. Deeper.

At this point we know three things:

- How to create a constructor function.
- How to add methods to the constructor function's prototype.
- How to use Object.create to delegate failed lookups to the function's prototype.

Those three tasks seem pretty foundational to any programming language. Is JavaScript really that bad that there's no easier, "built in" way to accomplish the same thing? As you can probably guess at this point there is, and it's by using the ```new``` keyword.

What's nice about the slow, methodical approach we took to get here is you'll now have a deep understanding of exactly what the ```new``` keyword in JavaScript is doing under the hood.

Looking back at our ```Animal``` constructor, the two most important parts were creating the object and returning it. Without creating the object with ```Object.create```, we wouldn't be able to delegate to the function's prototype on failed lookups. Without the ```return``` statement, we wouldn't ever get back the created object.

```javascript
function Animal (name, energy) {
  let animal = Object.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  return animal
}
```

Here's the cool thing about ```new``` - when you invoke a function using the new keyword, those two lines are done for you implicitly ("under the hood") and the object that is created is called ```this```.

Using comments to show what happens under the hood and assuming the ```Animal``` constructor is called with the ```new``` keyword, it can be re-written as this.

```javascript
function Animal (name, energy) {
  // const this = Object.create(Animal.prototype)

  this.name = name
  this.energy = energy

  // return this
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
```

and without the "under the hood" comments

```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
```

Again the reason this works and that the ```this``` object is created for us is because we called the constructor function with the ```new``` keyword. If you leave off ```new``` when you invoke the function, that this object never gets created nor does it get implicitly returned. We can see the issue with ```this``` in the example below.

```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

const leo = Animal('Leo', 7)
console.log(leo) // undefined
```

The name for this pattern is ```Pseudoclassical Instantiation```.

If JavaScript isn't your first programming language, you might be getting a little restless.

> "WTF this dude just re-created a crappier version of a Class" - You

For those unfamiliar, a Class allows you to create a blueprint for an object. Then whenever you create an instance of that Class, you get an object with the properties and methods defined in the blueprint.

Sound familiar? That's basically what we did with our ```Animal``` constructor function above. However, instead of using the ```class``` keyword, we just used a regular old JavaScript function to re-create the same functionality. Granted, it took a little extra work as well as some knowledge about what happens "under the hood" of JavaScript but the results are the same.

Here's the good news. JavaScript isn't a dead language. It's constantly being improved and added to by the TC-39 committee. What that means is that even though the initial version of JavaScript didn't support classes, there's no reason they can't be added to the official specification. In fact, that's exactly what the TC-39 committee did. In 2015, EcmaScript (the official JavaScript specification) 6 was released with support for Classes and the ```class``` keyword. Let's see how our ```Animal``` constructor function above would look like with the new class syntax.

```javascript
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
```

Pretty clean, right?

So if this is the new way to create classes, why did we spend so much time going over the old way? The reason for that is because the new way (with the ```class``` keyword) is primarily just "syntactical sugar" over the existing way we've called the pseudoclassical pattern. In order to fully understand the convenience syntax of ES6 classes, you first must understand the pseudoclassical pattern.

At this point we've covered the fundamentals of JavaScript's prototype. The rest of this post will be dedicated to understanding other "good to know" topics related to it. In another post we'll look at how we can take these fundamentals and use them to understand how inheritance works in JavaScript.

Array Methods
We talked in depth above about how if you want to share methods across instances of a class, you should stick those methods on the class' (or function's) prototype. We can see this same pattern demonstrated if we look at the ```Array``` class. Historically you've probably created your arrays like this

```javascript
const friends = []
```
Turns out that's just sugar over creating a ```new``` instance of the ```Array``` class.
```javascript
const friendsWithSugar = []

const friendsWithoutSugar = new Array()
```
One thing you might have never thought about is how does every instance of an array have all of those built in methods (```splice```, ```slice```, ```pop```, etc)?

Well as you now know, it's because those methods live on ```Array.prototype``` and when you create a new instance of ```Array```, you use the ```new``` keyword which sets up that delegation to ```Array.prototype``` on failed lookups.

We can see all the array's methods by simply logging ```Array.prototype```.

```javascript
console.log(Array.prototype)

/*
  concat: ƒn concat()
  constructor: ƒn Array()
  copyWithin: ƒn copyWithin()
  entries: ƒn entries()
  every: ƒn every()
  fill: ƒn fill()
  filter: ƒn filter()
  find: ƒn find()
  findIndex: ƒn findIndex()
  forEach: ƒn forEach()
  includes: ƒn includes()
  indexOf: ƒn indexOf()
  join: ƒn join()
  keys: ƒn keys()
  lastIndexOf: ƒn lastIndexOf()
  length: 0n
  map: ƒn map()
  pop: ƒn pop()
  push: ƒn push()
  reduce: ƒn reduce()
  reduceRight: ƒn reduceRight()
  reverse: ƒn reverse()
  shift: ƒn shift()
  slice: ƒn slice()
  some: ƒn some()
  sort: ƒn sort()
  splice: ƒn splice()
  toLocaleString: ƒn toLocaleString()
  toString: ƒn toString()
  unshift: ƒn unshift()
  values: ƒn values()
*/
```

The exact same logic exists for Objects as well. Alls object will delegate to ```Object.prototype``` on failed lookups which is why all objects have methods like ```toString``` and ```hasOwnProperty```.

### Static Methods

Up until this point we've covered the why and how of sharing methods between instances of a Class. However, what if we had a method that was important to the Class, but didn't need to be shared across instances? For example, what if we had a function that took in an array of ```Animal``` instances and determined which one needed to be fed next? We'll call it ```nextToEat```.

```javascript
function nextToEat (animals) {
  const sortedByLeastEnergy = animals.sort((a,b) => {
    return a.energy - b.energy
  })

  return sortedByLeastEnergy[0].name
}
```

It doesn't make sense to have ```nextToEat``` live on ```Animal.prototype``` since we don't want to share it amongst all instances. Instead, we can think of it as more of a helper method. So if ```nextToEat``` shouldn't live on ```Animal.prototype```, where should we put it? Well the obvious answer is we could just stick ```nextToEat``` in the same scope as our ```Animal``` class then reference it when we need it as we normally would.

```javascript
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function nextToEat (animals) {
  const sortedByLeastEnergy = animals.sort((a,b) => {
    return a.energy - b.energy
  })

  return sortedByLeastEnergy[0].name
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

console.log(nextToEat([leo, snoop])) // Leo
```

Now this works, but there's a better way.

> Whenever you have a method that is specific to a class itself, but doesn't need to be shared across instances of that class, you can add it as a static property of the class.

```javascript
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
  static nextToEat(animals) {
    const sortedByLeastEnergy = animals.sort((a,b) => {
      return a.energy - b.energy
    })

    return sortedByLeastEnergy[0].name
  }
}
```

Now, because we added ```nextToEat``` as a ```static``` property on the class, it lives on the ```Animal``` class itself (not its prototype) and can be accessed using ```Animal.nextToEat```.

```javascript
const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

console.log(Animal.nextToEat([leo, snoop])) // Leo
```

Because we've followed a similar pattern throughout this post, let's take a look at how we would accomplish this same thing using ES5. In the example above we saw how using the ```static``` keyword would put the method directly onto the class itself. With ES5, this same pattern is as simple as just manually adding the method to the function object.

```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

Animal.nextToEat = function (nextToEat) {
  const sortedByLeastEnergy = animals.sort((a,b) => {
    return a.energy - b.energy
  })

  return sortedByLeastEnergy[0].name
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

console.log(Animal.nextToEat([leo, snoop])) // Leo
```

### Getting the prototype of an object

Regardless of whichever pattern you used to create an object, getting that object's prototype can be accomplished using the ```Object.getPrototypeOf``` method.

```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)
const prototype = Object.getPrototypeOf(leo)

console.log(prototype)
// {constructor: ƒ, eat: ƒ, sleep: ƒ, play: ƒ}

prototype === Animal.prototype // true
```

There are two important takeaways from the code above.

First, you'll notice that ```proto``` is an object with 4 methods, ```constructor```, ```eat```, ```sleep```, and ```play```. That makes sense. We used ```getPrototypeOf``` passing in the instance, ```leo``` getting back that instances' prototype, which is where all of our methods are living. This tells us one more thing about ```prototype``` as well that we haven't talked about yet. By default, the ```prototype``` object will have a ```constructor``` property which points to the original function or the class that the instance was created from. What this also means is that because JavaScript puts a ```constructor``` property on the prototype by default, any instances will be able to access their constructor via ```instance.constructor```.

The second important takeaway from above is that ```Object.getPrototypeOf(leo) === Animal.prototype```. That makes sense as well. The ```Animal``` constructor function has a prototype property where we can share methods across all instances and ```getPrototypeOf``` allows us to see the prototype of the instance itself.

```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

const leo = new Animal('Leo', 7)
console.log(leo.constructor) // Logs the constructor function
```

To tie in what we talked about earlier with ```Object.create```, the reason this works is because any instances of ```Animal``` are going to delegate to ```Animal.prototype``` on failed lookups. So when you try to access ```leo.constructor```, ```leo``` doesn't have a ```constructor``` property so it will delegate that lookup to ```Animal.prototype``` which indeed does have a ```constructor``` property. If this paragraph didn't make sense, go back and read about ```Object.create``` above.

> You may have seen __proto__ used before to get an instances' prototype. That's a relic of the past. Instead, use Object.getPrototypeOf(instance) as we saw above.

### Determining if a property lives on the prototype

There are certain cases where you need to know if a property lives on the instance itself or if it lives on the prototype the object delegates to. We can see this in action by looping over our ```leo``` object we've been creating. Let's say the goal was the loop over ```leo``` and log all of its keys and values. Using a ```for in``` loop, that would probably look like this.

```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)

for(let key in leo) {
  console.log(`Key: ${key}. Value: ${leo[key]}`)
}
```

What would you expect to see? Most likely, it was something like this -

```javascript
Key: name. Value: Leo
Key: energy. Value: 7
```

However, what you saw if you ran the code was this -

```javascript
Key: name. Value: Leo
Key: energy. Value: 7
Key: eat. Value: function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}
Key: sleep. Value: function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}
Key: play. Value: function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}
```

Why is that? Well a ```for in``` loop is going to loop over all of the enumerable properties on both the object itself as well as the prototype it delegates to. Because by default any property you add to the function's prototype is enumerable, we see not only ```name``` and ```energy```, but we also see all the methods on the prototype - ```eat```, ```sleep```, and ```play```. To fix this, we either need to specify that all of the prototype methods are non-enumerable or we need a way to only console.log if the property is on the ```leo``` object itself and not the prototype that ```leo``` delegates to on failed lookups. This is where ```hasOwnProperty``` can help us out.

```hasOwnProperty``` is a property on every object that returns a boolean indicating whether the object has the specified property as its own property rather than on the prototype the object delegates to. That's exactly what we need. Now with this new knowledge we can modify our code to take advantage of ```hasOwnProperty``` inside of our ```for in``` loop.

```javascript
const leo = new Animal('Leo', 7)

for(let key in leo) {
  if (leo.hasOwnProperty(key)) {
    console.log(`Key: ${key}. Value: ${leo[key]}`)
  }
}
```

And now what we see are only the properties that are on the ```leo``` object itself rather than on the prototype ```leo``` delegates to as well.

```javascript
Key: name. Value: Leo
Key: energy. Value: 7
```

If you're still a tad confused about ```hasOwnProperty```, here is some code that may clear it up.

```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)

leo.hasOwnProperty('name') // true
leo.hasOwnProperty('energy') // true
leo.hasOwnProperty('eat') // false
leo.hasOwnProperty('sleep') // false
leo.hasOwnProperty('play') // false
```

### Check if an object is an instance of a Class

Sometimes you want to know whether an object is an instance of a specific class. To do this, you can use the ```instanceof``` operator. The use case is pretty straight forward but the actual syntax is a bit weird if you've never seen it before. It works like this

```javascript
object instanceof Class
```

The statement above will return true if ```object``` is an instance of ```Class``` and false if it isn't. Going back to our ```Animal``` example we'd have something like this.

```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

function User () {}

const leo = new Animal('Leo', 7)

leo instanceof Animal // true
leo instanceof User // false
```

The way that ```instanceof``` works is it checks for the presence of constructor.prototype in the object's prototype chain. In the example above, ```leo instanceof Animal``` is ```true``` because ```Object.getPrototypeOf(leo) === Animal.prototype```. In addition, ```leo instanceof User``` is ```false``` because ```Object.getPrototypeOf(leo) !== User.prototype```.

### Creating new agnostic constructor functions

Can you spot the error in the code below?

```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

const leo = Animal('Leo', 7)
```

Even seasoned JavaScript developers will sometimes get tripped up on the example above. Because we're using the ```pseudoclassical pattern``` that we learned about earlier, when the ```Animal``` constructor function is invoked, we need to make sure we invoke it with the ```new``` keyword. If we don't, then the ```this``` keyword won't be created and it also won't be implicitly returned.

As a refresher, the commented out lines are what happens behind the scenes when you use the ```new``` keyword on a function.

```javascript
function Animal (name, energy) {
  // const this = Object.create(Animal.prototype)

  this.name = name
  this.energy = energy

  // return this
}
```

This seems like too important of a detail to leave up to other developers to remember. Assuming we're working on a team with other developers, is there a way we could ensure that our ```Animal``` constructor is always invoked with the ```new``` keyword? Turns out there is and it's by using the ```instanceof``` operator we learned about previously.

If the constructor was called with the ```new``` keyword, then ```this``` inside of the body of the constructor will be an ```instanceof``` the constructor function itself. That was a lot of big words. Here's some code.

```javascript
function Animal (name, energy) {
  if (this instanceof Animal === false) {
    console.warn('Forgot to call Animal with the new keyword')
  }

  this.name = name
  this.energy = energy
}
```

Now instead of just logging a warning to the consumer of the function, what if we re-invoke the function, but with the ```new``` keyword this time?

```javascript
function Animal (name, energy) {
  if (this instanceof Animal === false) {
    return new Animal(name, energy)
  }

  this.name = name
  this.energy = energy
}
```

Now regardless of if ```Animal``` is invoked with the ```new``` keyword, it'll still work properly.

### Re-creating Object.create

Throughout this post we've relied heavily upon ```Object.create``` in order to create objects which delegate to the constructor function's prototype. At this point, you should know how to use ```Object.create``` inside of your code but one thing that you might not have thought of is how ```Object.create``` actually works under the hood. In order for you to really understand how ```Object.create``` works, we're going to re-create it ourselves. First, what do we know about how ```Object.create``` works?

- It takes in an argument that is an object.
- It creates an object that delegates to the argument object on failed lookups.
- It returns the new created object.

Let's start off with #1.

```javascript
Object.create = function (objToDelegateTo) {

}
```

Simple enough.

Now #2 - we need to create an object that will delegate to the argument object on failed lookups. This one is a little more tricky. To do this, we'll use our knowledge of how the ```new``` keyword and prototypes work in JavaScript. First, inside the body of our ```Object.create``` implementation, we'll create an empty function. Then, we'll set the prototype of that empty function equal to the argument object. Then, in order to create a new object, we'll invoke our empty function using the ```new``` keyword. If we return that newly created object, that'll finish #3 as well.

```javascript
Object.create = function (objToDelegateTo) {
  function Fn(){}
  Fn.prototype = objToDelegateTo
  return new Fn()
}
```
Wild. Let's walk through it.

When we create a new function, ```Fn``` in the code above, it comes with a ```prototype``` property. When we invoke it with the ```new``` keyword, we know what we'll get back is an object that will delegate to the function's prototype on failed lookups. If we override the function's prototype, then we can decide which object to delegate to on failed lookups. So in our example above, we override ```Fn```'s prototype with the object that was passed in when ```Object.create``` was invoked which we call ```objToDelegateTo```.

> Note that we're only supporting a single argument to Object.create. The official implementation also supports a second, optional argument which allow you to add more properties to the created object.

### Arrow Functions

Arrow functions don't have their own ```this``` keyword. As a result, arrow functions can't be constructor functions and if you try to invoke an arrow function with the ```new``` keyword, it'll throw an error.
```javascript
const Animal = () => {}

const leo = new Animal() // Error: Animal is not a constructor
```
Also, because we demonstrated above that the pseudoclassical pattern can't be used with arrow functions, arrow functions also don't have a ```prototype``` property.
```javascript
const Animal = () => {}
console.log(Animal.prototype) // undefined
```

## Resources:

[Source I](https://ui.dev/var-let-const/) - [Source II](https://medium.com/better-programming/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8) - [Source III](https://dev.to/shimphillip/javascript-closure-simply-explained-1f79) - [Source IV](https://dev.to/tylermcginnis/a-beginners-guide-to-javascripts-prototype-5kk)