---
title: Understanding the “this” Keyword in JavaScript
date: "2020-12-30T08:38:00.000Z"
---

In this article, we’re going to learn about the JavaScript keyword "this" and how the value ...

<!-- more -->

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

[Source](https://medium.com/better-programming/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8)