---
title: JavaScript Closure Simply Explained
date: "2020-12-19T08:38:00.000Z"
---

In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a ...

<!-- more -->

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

[Source](https://dev.to/shimphillip/javascript-closure-simply-explained-1f79)