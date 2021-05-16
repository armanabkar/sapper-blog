---
title: Functional and Reactive Programming in JS
date: "2021-01-01T08:38:00.000Z"
---

In this article we will explore functional & reactive programming both in general terms and ...

<!-- more -->

<h2 align="center">
  <img src="https://www.morrisopazo.com/wp-content/uploads/AWS-Lambda-librer%C3%ADas-y-binarios-Morris-Opazo.jpg" width="600px" />
  <br>
</h2>

# An Adequate Introduction to Functional Programming

This article is part of a series where we explore functional and reactive programming both in general terms and applied to JavaScript.

In this first post, we discuss several functional core concepts with a practical approach, dwelling on the theoretical part only if strictly needed. In the second one, we’ll talk about functional streams, while in the third and fourth episodes we’ll implement from scratch our version of RxJS.
Introduction to Functional & Reactive Programming

## Introduction

Functional programming models software as a set of pure functions, avoiding shared mutable state. For now, it is enough to know that a pure function is a function that doesn’t modify the environment and its return value is the same for the same arguments. Meanwhile, the main issue with shared state is that it will decrease predictability and makes harder to follow the logic flow.

To be clear: different problems require different tools, it doesn’t exist the perfect and universal paradigm, but there are a lot of situations where FP can bring advantages. Here’s a summary:

1. focus on what you want to achieve (declarative), not how (imperative)
2. more readable code, which hides useless implementation details
3. clear logic flow, state is less dispersed nor implicitly modified
4. functions/modules became easily testable, reusable and maintainable
5. “safer” code, without side effects
Why we care about imperative and declarative approaches? Let’s discuss the difference with an example, which performs the same operation in both ways: filter out odd numbers from a list while incrementing to five the smaller ones.

```javascript
const numbers = [1,2,3,4,5,6,7,8,9,10]

// IMPERATIVE approach
let result = []
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    if (numbers[i] < 5) {
      result.push(5)
      continue
    }
    result.push(numbers[i])
  }
}

// DECLARATIVE approach
numbers
  .filter(n => n % 2 === 0)
  .map(n => n < 5 ? 5 : n)
```

Same computation, same result. But, as you can see, the imperative code is verbose and not immediately clear. On the other hand, the declarative approach is readable and explicit, because it focuses on what we want to obtain. Imagine extending the same difference to big parts of your applications and return to the same code after months. Your future self (and your colleagues also) will appreciate this declarative style!

Again, there’s no “best paradigm” as someone may claim, only the right tool for a specific case, indeed I’m also a big fan of OOP when implemented using composition (the Go "way”). In any case, functional programming could find several places in your applications to improve readability and predictability.

Let’s start to explore some FP core concepts. We’ll see how each of them will bring some of the advantages listed above.

## Pure functions

A function is pure when:

- it has no observable side effects, such as I/O, external variables mutation, file system changes, DOM changes, HTTP calls and more,
- has referential transparency: the function can be replaced with the result of its execution without changing the result of the overall computation.
Let’s clarify the definition with some basic examples.

```javascript
// impure, modifies external state
let counter = 0
const incrementCounter = (n) => {
  counter = counter + n
  return counter
}
// impure, I/O
const addAndSend = (x1, x2) => {
  const sum = x1 + x2
  return fetch(`SOME_API?sum=${sum}`)
}

// both pure, no side effects
const add = (x1, x2) => {
  return x1 + x2
}
const formatUsers = users => {
  if (!(users instanceof Array)) {
    return []   
  }
  return users.map(user => `
    Name: ${user.first} ${user.last},
    Age: ${user.age}
  `)
}
```

Pure functions are “safe” because they never mutate implicitly any variable, from which other parts of your code could depend now or later.

It may seem uncomfortable to code with these restrictions but think about this: pure functions are deterministic, “abstractable”, predictable and composable.

## Functions as values

In languages that support FP, functions are values, so you can pass and return them to and from other functions and store them in variables.

In JS we are already used to this pattern (maybe not consciously), for example when we provide a callback to a DOM event listener or when we use array methods like ```map```, ```reduce``` or ```filter```.

Let’s look again at the previous example:

```javascript
const formatUsers = users => {
  if (!(users instanceof Array)) {
    return []   
  }
  return users.map(user => `
    Name: ${user.first} ${user.last},
    Age: ${user.age}
  `)
}
```

Here the ```map``` argument is an inline anonymous function (or lambda). We can rewrite the snippet above to demonstrate more clearly the “function as value” idea, where the function ```userF``` is passed explicitly to ```map```.

```javascript
const userF = user => {
  return `
    Name: ${user.first} ${user.last},
    Age: ${user.age}
  `
}

const formatUsers = users => {
  if (!(users instanceof Array)) {
    return []
  }  
  return users.map(userF)
}
```

The fact that functions in JS are values allows the use of higher-order functions (HOF): functions that receive other functions as arguments and/or return new functions, often obtained from those received as inputs. HOFs are used for different purposes as specialization and composition of functions.

Let's look at the ```get``` HOF. This utility allows to obtain internal node values of objects/arrays safely and without errors (tip: the syntax ```...props``` is defined REST, it is used to collect a list of arguments as an array saved in the parameter named props).

```javascript
const get = (...props) => obj => {
  return props.reduce(
    (objNode, prop) => objNode && objNode[prop]
      ? objNode[prop]
      : null,
    obj
  )
}
```

Get receives a list of keys, used to find the desired value, and returns a (specialized) function which expect the object to dig into.

Here’s a realistic example. We want to extract the ```description``` node from the first element in the array ```monuments``` from a not-always-complete object (maybe received from an untrusted API). We can generate a safe getter in order to do this.

```javascript
const Milan = {
  country: 'Italy',
  coords: { lang: 45, lat: 9 },
  monuments: [
    {
      name: 'Duomo di Milano',
      rank: 23473,
      infos: {
        description: 'Beautiful gothic church build at the end of…',
        type: 'Church'
      }
    },
    { /* ... */ },
    { /* ... */ },
    { /* ... */ }
  ]
}
```

No need for multiple (boring) checks:

```javascript
const getBestMonumentDescription = get('monuments', 0, 'infos', 'description')

getBestMonumentDescription(Milan)   // 'Beautiful gothic church…'
getBestMonumentDescription({})      // null (and no errors)

getBestMonumentDescription(undefined)   // null (same for null, NaN, etc..)
getBestMonumentDescription()        // null
```

## Function composition

Pure function can be composed together to create safe and more complex logic, due to absence of side effects. By “safe” I mean that we're not going to change the environment or external variables (to the function) which other parts of our code could rely on.

Of course, using pure functions to create a new one does not ensure the purity of the latter, unless we carefully avoid side effects in each of its parts. Let's take an example. we want to sum the money of all users that satisfy a given condition.

```javascript
const users = [
  {id: 1, name: "Mark", registered: true, money: 46},
  {id: 2, name: "Bill", registered: false, money: 22},
  {id: 3, name: "Steve", registered: true, money: 71}
]


// simple pure functions
const isArray = v => v instanceof Array
const getUserMoney = get('money')
const add = (x1, x2) => x1 + x2

const isValidPayer = user =>
  get('registered')(user) &&
  get('money')(user) > 40


// desired logic
export const sumMoneyOfRegUsers = users => {
  if (!isArray(users)) {
    return 0
  }
  return users
    .filter( isValidPayer )
    .map( getUserMoney )
    .reduce( add, 0 )
}


sumMoneyOfRegUsers(users)  // 117
```

We ```filter``` the users array, we generate a second one with the money amounts (```map```) and finally we sum (```reduce```) all the values. We have composed the logic of our operation in a clear, declarative and readable way. At the same time, we avoided side effects, so the state/environment before and after the function call is the same.

```javascript
// application state
const money = sumMoneyFromRegUsers(users)
// same application state
```

Beside manual composition, there are utilities that help us to compose functions. Two of them are particularly useful: ```pipe``` and ```compose```. The idea is simple: we are going to concatenate n functions, calling each of them with the output of the previous one.

```javascript
// function composition with pipe 
// pipe(f,g,h)(val) === h(g(f(val)))
const pipe = (...funcs) => {
  return (firstVal) => {
    return funcs.reduce((partial, func) => func(partial), firstVal)
  }
}

// or more concisely
const pipe = (...fns) => x0 => fns.reduce((x, f) => f(x), x0)
```

Pipe is a HOF that expects a list of functions. Then, the returned function needs the starting value, which will pass through all the previous provided functions, in an input-output chain. Compose is very similar but operates from right to left:

```javascript
// compose(f,g,h)(val) === f(g(h(val))) 
const compose = (...fns) => x0 => fns.reduceRight((x, f) => f(x), x0)
```

Let’s clarify the idea with a simple example:

```javascript
// simple functions
const arrify = x => x instanceof Array ? x : [x]
const getUserMoney = get('money')
const getUserReg = get('registered')


const filterValidPayers = users => users.filter( user =>
    getUserReg(user) &&
    getUserMoney(user) > 40
)
const getUsersMoney = users => users.map(getUserMoney)
const sumUsersMoney = moneyArray => moneyArray.reduce((x, y) => x + y, 0)


// desired logic
export const sumMoneyOfRegUsers = pipe(
  arrify,
  filterValidPayers, 
  getUsersMoney,
  sumUsersMoney
)

// get result
sumMoneyOfRegUsers(users)  // 117
```

We could also examine each intermediate result using the tap utility.

```javascript
// debug-only
const tap = thing => {
   console.log(thing)
   return thing
}

export const sumMoneyOfRegUsers = pipe(
  arrify,
  filterValidPayers,
  tap,
  getUsersMoney,
  tap,
  sumUsersMoney
)

// get result
sumMoneyOfRegUsers(users)

// [{...}, {...}] first tap             
// [46, 71]   second tap
// 117        final result
```

## Immutability & immutable approach
Immutability is a core concept in FP. Data structures should be considered immutable in order to avoid side effects and increase predictability. This concept brings other advantages: mutation tracking & performance (in certain situations).

To achieve immutability in JS, we must adopt an immutable approach by convention, that is copying objects and arrays instead of “in place” mutations. In other words, we always want to preserve the original data making new copies.

Objects and arrays are passed by reference in JS, that is, if referenced by other variables or passed as arguments, changes to the latter ones affects also the originals. Sometimes copying the object in a shallow way (one level deep) is not enough, because there could be internal objects that are in turn passed by reference.

If we want to break all ties with the original, we should clone, as we say, deep. Seems complicated? Maybe, but bear with me for a few minutes! 😁

The most useful language tools to clone and update data structures are:

- the object and the array spread operator ( “…” syntax ),
- arrays methods as map, filter and reduce. Both of them return a shallow copy.
Here some editing operations, performed with an immutable approach:

```javascript
// OBJECT SPREAD OPERATOR 
const user = {
  id: 1,
  name: 'Mark',
  money: 73,
  registered: true
}
const updatedUser = { ...user, registered: false }


// ARRAY SPREAD OPERATOR
const cities = [ 'Rome', 'Milan', 'New York' ]
const newCities = [ ...cities, 'London' ]
```

In both examples, individual elements of the array and individual properties of the object are copied in a new array and in a new object respectively, which are independent from the original ones.

To edit, add or delete elements from an array of objects in an immutable way we could use a combination of spread operators and array methods. Each time we create a new collection with some variation, based on the specific task.

```javascript
// original
const subscribers = [
  {id: 1, name: 'Tyler', registered: true, money: 36 },
  {id: 2, name: 'Donald', registered: true, money: 26 },
  {id: 3, name: 'William', registered: true, money: 61 }
]

// EDIT 
const newSubscribers1 = subscribers
  .map( sub => sub.name === 'Donald' ? {...sub, money: 89} : sub )

// DELETE
const newSubscribers2 = subscribers
  .filter( sub => sub.name !== 'Tyler' )

// ADD
const newSubscribers3 = [
    ...subscribers, 
    { id: 4, name: 'Bob', registered: false, money: 34 }
  ]
```

Let's talk quickly about shallow and deep copies, starting with some code.

```javascript
const subscribers = [
  { id: 1, name: 'Tyler', registered: true, money: 36 },
  { id: 2, name: 'Donald', registered: true, money: 26 },
  { id: 3, name: 'William', registered: true, money: 61 }
]
// SHALLOW copy
const newSubscribers1 = [ ...subscribers ]
// DEEP copy (specific case)
const newSubscribers2 = subscribers.map( sub => ({...sub}) )
```

The difference between the two types of copies is that, if we change a property of an object in the shallow copied array the change is also reflected to the original, which does not happen in the deep copy. In the latter case this occurs because, in addition to the array cloning operation, we also clone the contained objects.

Both types of copy are usable and fine, as long as you always clone the parts that need to be modified. In this way we will never modify the original.

A general “deep” solution is made with recursive functions (which we should take from libraries for convenience and reliability). Deep copies are useful if we want to be completely free to manipulate data or if we don't trust third-party code.

## A note on performance

Let's talk briefly about performance. There are certain situations where immutability can boost our apps. For example, a clone will be allocated in a memory location different from the original, allowing an easy and quick comparison by reference. Same pointer/reference (=== for objects)? No changes. Different reference? Change detected, so react properly. No need of internal comparisons, because we have decided to create separate copies for each change.

On the other hand, making new copies each time could generate a lot of memory consumption, leading to performance losses. This is a well-known intrinsic problem of functional programming, solved by sharing parts of the manipulated data structures between the clones. Anyway, this complex topic goes beyond the scope of the current article.

### State management & side effects

At some point we need to use state, to save permanent variables, make some I/O, modify the file system and so on. Without these operations an application is just a black box. So, how and where to manage state and side effects?

Let’s start from the basics. Why we try to avoid shared, mutable and scattered state? Well, the problem basically boils down to this idea: with shared state in order to understand the effects of a function, you have to know the entire history of every shared variable that the function uses or affects. Another way to put this problem is: functions/operations/routines that act on shared state are time and order dependent.

In conclusion, shared mutable state reduces predictability and makes harder to follow the logic flow.

Pure FP languages tend to push state and side effects at the borders of the application, to manage them in a single place. Indeed, the functional solution to this problem is to handle state in a single (large) object “outside” the application, updated with an immutable approach (so cloned and updated each time).

In the front-end development field, this pattern is adopted and implemented with so-called state-managers such as Redux and NgRx. At a cost of more code (not so much) and complexity, our applications will become more predictable, manageable and maintainable.

Here's how state-managers works, in a super simplified diagram. Events trigger actions that activate reducers, which update the state (store). As an end result, the (mostly) stateless UI will be updated properly. The argument is complex, but I briefly touched the topic to get you into the fundamental idea.

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--QGARCaUV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/3foybl6yynrih1uofzuo.png" width="600px" />
  <br>
</h2>

Furthermore, side effects are containerized and executed in one or a few specific points of the application (see NgRx effects), always with the aim of improving their management.

In addition, this pattern allows mutation tracking. What do we mean? If we update the application state only with immutable versions, we can collect them over time (even trivially in an array). As a result, we can easily track changes and switch from one application "condition" to another. This feature is known as time travel debugging in Redux-like state managers.

## Conclusions

In the attempt to treat FP extensively, we didn’t talk about some important concepts that we must mention now: currying & partial application, memoization and functional data types.

Talking in-depth about FP would take months, but I think that this introduction is already a good starting point for those who want to introduce the paradigm in some parts of their applications.

In the next article, we’ll talk about functional streams, entering the world of reactive programming. Hope to see you there! 😁

PS: English is not my mother tongue, so errors are just around the corner. Feel free to comment with corrections!

---

# Reactive Programming - an Introductory Model

In the first article of this series we saw some fundamental ideas of functional programming. In this second post we will approach reactive programming by creating streams and producers (two abstractions) to easily manage synchronous and asynchronous events & data flows.

The aim of this article is also to start thinking about reactivity and its related problems. Furthermore, we will build the way up to the next episodes, where we will re-implement a simple version of RxJS.

## Introduction

Promises and the async/await syntax have greatly improved our ability to reason about asynchronous code, but here our aim is to create a simple and unified declarative model to easily manage every type of data flows. With this reactive approach, we can:

- have declarative and clear data flows
- avoid so-called callback hells
- easily manage interdependent asynchronous events
- control over time the outcome of consecutive events

In the front-end world, asynchronous data come from a set of different situations: HTTP calls, DOM events, intervals, timers, access to some browser APIs and a lot more. We will start by handling synchronous data and by understanding the fundamental logic, then the asynchronous part will become easy to follow too.

Let’s start building our reactive model!

## Synchronous Streams

The stream abstraction that we will build consists of a chain of functions. Streams receive input values from the outside (they do not produce values themselves). These “pushed” values are elaborated through a series of functions in an order-dependent manner.

The difference with the classic usage of pipe/compose utilities (that we have treated in the first article) is that instead of each function being called immediately with the output of the previous one, we want to delegate each of them to call the next one when it is time to do so.

We use compose and some HOFs called operators inside our streams, like composable "bricks" or “units of data elaboration”. Let’s rewrite compose to fit our specific use case.

```javascript
// new parameter names 
const compose =
  (...destFuncs) =>
        (listener) =>
           destFuncs.reduceRight((next, prev) => prev(next), listener)
```

The API of our streams will look like this:

```javascript
// create the stream
const stream = compose(
  operator1(arg1),
  operator2(arg2),
  operator3(arg3)
)
// provide the listener (a function) as the final destination 
const streamIntoListener = stream(listener)

// push values into the stream manually or attach the stream to something
streamIntoListener(1)
streamIntoListener(2)
inputTextDOM.addEventListener('input', streamIntoListener)
```

Let’s start by explaining the fundamental idea. I will spend some time on each step in a minute so don’t worry if you cannot follow the logic on the first time, it’s not that easy! 😁

First of all, down below you can find the map operator implementation. I’ve labelled the operator and the returned functions sequentially in order to better explain the mechanism.

```javascript
// const map = (1)mapFunc => (2)next => (3)val => next(mapFunc(val))
const map = mapFunc => next => val => next(mapFunc(val))
```

Now, the main logic.

Operator functions (1) receive an argument (operator specific), then they return a second function (2) waiting for a “destination” function (the next parameter). This (2) in its turn returns a third function (3) waiting for the value to be processed and passed to the following operator of the stream.

The next function/argument is provided by compose therefore next references the following operator (3) in the stream.

Each generated function (3), as soon as it receives the event/data (val), will call the following operator (3) (referenced by next) depending on some operator-specific logic. In our case, map simply applies a mapping function to the value, then immediately invokes next with the result.

I know that it sounds complicated but bear with me for a few minutes! 😁

Let’s clarify the logic with an example. NB: the sync examples look over-engineered but again, by understanding the fundamental idea, the more interesting async part will become immediately clear.

```javascript
// this simple stream ..
const stream = compose(
  map(e => e.target.value),
  map(string => string.toUpperCase()),
  map(string => ({
    formatted: `Input value is: ${string}`,
    raw: string
  })),
)

// .. is equivalent to calling compose with:
let f1 = e => e.target.value
let f2 = string => string.toUpperCase()
let f3 = string => ({
  formatted: `Input value is: ${string}`,
  raw: string
})

const stream = compose(
  next => val => next(f1(val)),
  next => val => next(f2(val)),
  next => val => next(f3(val))
)
```

Compose is invoked and it returns another function waiting for the “final destination” function (listener argument), while destFuncs is an array of the arguments of compose (2) (array of functions: next => val => …).

When we provide the listener function, the reduceRight will execute, giving to each operator (2) the next operator (from right to left).

At the end we will have a function waiting for values to be processed (3), where next (of the first operator) is the second operator (3), which in turn has next fixed at the third operator (3) and so on, until the last next, fixed at the listener function.

Here’s the complete example (again, nothing too fancy, just to grasp the mechanism).

```javascript
// create the stream
const stream = compose(
  map(e => e.target.value),
  map(string => string.toUpperCase()),
  map(string => ({
    formatted: `Input value is: ${string}`,
    raw: string
  })),
)

// provide the listener (final destination)
const streamIntoLog = stream(console.log)

// bind the stream to an event emitter
document.querySelector('#searchBox').addEventListener(
  'input',
  streamIntoLog
)
```

Let’s test the example typing “JavaScript” into the hypothetical input field.

```javascript
// {formatted: "Input value is: J", raw: "J"}
// {formatted: "Input value is: JA", raw: "JA"}
// ...
// {formatted: "Input value is: JAVASCRIPT", raw: "JAVASCRIPT"}
```

When the DOM event fires, the event object value will be pushed into the stream and elaborated through the operators until the listener (console.log in this case). If the logic is clear to you, congrats, the harder part is done! 😁

In conclusion of this section, let’s focus on the fundamental difference between the two forms below.

```javascript
// when invoked, synchronously pass values from one function to the next one
const stream1 = pipe(
  e => e.target.value,
  string => string.toUpperCase(),
  string => ({
    formatted: `The input value is: ${string}`,
    value: string
  })
)


// when invoked provides the ‘next’ argument to each operator, then you can 
// pass values. Each operator is in charge of calling the next one
const stream2 = compose(
  map(e => e.target.value),
  map(string => string.toUpperCase()),
  map(string => ({
    formatted: `The input value is: ${string}`,
    value: string
  }))
)
```

In the first form, the simplest, pipe is used to pass values directly from one function to the next one synchronously, each one of them being completely unaware about the context. Meanwhile in the second case, compose is used to provide a destination (next) to each operator.

In other words, the logic is very different: in the first case, the value is passed synchronously from function to function under the supervision of the pipe utility, in the second case each function (3) is responsible for calling the next one (3) with the elaborated value.

Now it will be easier to handle async operations in our streams because they will be in charge to call the next step on their own when they are ready to do so! What do I mean by that? Let’s cover now the asynchronous part.

## Asynchronous Streams

It’s time to implement some asynchronous operators.

- throttleTime: it calls next only if the last event/data was emitted a certain amount of time after the last valid one. By using throttleTime, we reduce the frequency of the events
- debounceTime: it calls next with a delay, if a new event is emitted before calling next, the previously scheduled call is cancelled, and the last one is scheduled
- asyncMap: it waits for the resolution of a Promise returned by the provided argument function, then calls next with the result (NB: the argument function can be an async/await one since they always return Promises)

The debounce and throttle techniques allow us to “group” and/or “rarefy” multiple sequential events into a single event. Some use cases: to reduce network requests, to reduce computations on scroll, size or typing events. Here are some more simple operators:

- tap: it calls a provided function, without interfering with the event flow
- filter: it calls next if the provided filter function called with the value as argument returns a truthy value
Here’s the implementation of these operators, as you can see the logic is the same as the synchronous counterparts!

```javascript
const throttleTime = (time) => {
  let lastEventTime = 0
  return (next) => (val) => {
    if (Date.now() - lastEventTime > time) {
      lastEventTime = Date.now()
      next(val)
    }
  }
}

const debounceTime = (delay) => {
  let interval
  return (next) => (val) => {
    clearInterval(interval)
    interval = setTimeout(() => next(val), delay)
  }
}

const asyncMap = (mapPromiseFunc) => (next) => (val) => {
  mapPromiseFunc(val).then(next)
}

const tap = (fn) => (next) => (val) => {
  fn(val)
  next(val)
}

const filter = (filterFunc) => (next) => (val) => {
  if (filterFunc(val)) {
    next(val)
  }
}
```

## Real-world use cases

Now we are going to apply these new operators with a few real-world scenarios.

We want to debounce typing events of a text input and console.log an object. The example is didactic, realistically we want to make some computation or some HTTP requests at the end of our stream. The goal is to rarefy (the useless) intermediate events and wait until the last one.

```javascript
const debounceTyping = compose(
  debounceTime(800),
  map(e => e.target.value),
  map(string => string.toUpperCase()),
  map(string => ({
    formatted: `Input value is: ${string}`,
    value: string
  })),
)

const debounceTypingIntoLog = debounceTyping(
  console.log
  // or do some heavy work or a network request:
  //    - calculate something in your application
  //    - re-render part of the DOM
  //    - one or more HTTP request
  //    - etc..
)

document.querySelector('#textInput').addEventListener(
  'input',
  debounceTypingIntoLog
)
```

If we rapidly type something in the text input, we can see that only the last event will completely pass through the stream while the previous ones are ignored.

Indeed, the event object is passed to debounceTime, which after 800ms from the last invocation emits again the value received into its next (map in this case). Now we can avoid useless work until the user stops typing (intuitively when he’s done typing into the input).

Let’s make another more complex example. Based on a search box input, we want to dynamically find all posts of the typed user (via a REST API). We need to make some HTTP requests in order to retrieve the desired information and we want also to avoid useless HTTP calls. The same situation happens when we need to show some “search hints” to our user, without making HTTP requests to a server for each typing event.

```javascript
//https://jsonplaceholder.typicode.com/ is a test REST API

// fetch wrapper
const httpJSON = {
  get: async (endpoint) => {
    let res = await fetch(endpoint)
    return await res.json()
  },
  // post: ...
  // put: ...
  // delete: ...
}

const debounceSearchUserPosts = compose(
  debounceTime(800),
  map(e => e.target.value),
  map(string => string.toUpperCase()),
  asyncMap(user => httpJSON.get(`https://jsonplaceholder.typicode.com/users?q=${user}`)),  // wait HTTP response
  filter(users => users[0]),    // call next only if there's at least one user
  map(users => users[0].id),
  asyncMap(userId => httpJSON.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`))  // wait HTTP response
)

const debounceSearchUserPostsIntoLog = debounceSearchUserPosts(console.log)

// of course we can listen for every type of event
// or manually insert values into the stream
document.querySelector('#searchBox').addEventListener(
  'input',
  debounceSearchUserPostsIntoLog
)
```

In this example, we combined several useful tricks: declarative programming and clear data flow, debounced events and reduced network requests, simplified handling of interdependent async operations.

We have created a first simple reactive system in order to smartly pass synchronous and asynchronous values from one function to another, according to precise logic. The system is flexible and extendable by creating new operators, some of them may involve:

- a parallel version of asyncMap which accepts multiple functions and calls next with the result of all the async operations
- “cancellable” or “ignorable” Promises if a new event is fired before the end of the previous Promise completion
- arbitrary delays, intervals and Promises timeouts
- accumulation of values over time
- the ability to merge or combine multiple streams
and much more!

## From function to methods

This simple model can be greatly improved, so let's take another step. We want to handle errors in our streams as well as exhaustion/completion of event emission. To do so, the provided destinations (the old next argument) will no longer be functions, but objects with 3 methods:

1. next: called in normal conditions,
2. error: called in case of errors in the operator, propagates through the stream,
3. complete: called upon completion of the stream, propagates through the stream.
Now each operator will no longer call next, but dest.next if everything was fine, dest.error if something went wrong and dest.complete in case of termination/completion of the event flow.

Let’s refactor debounceTime and map operators, just to provide a blueprint of the slightly modified logic:

```javascript
const map = (mapFn) => (dest) =>
  ({
    next: (val) => {
      let nextVal
      try {
        nextVal = mapFn(val)
      } catch (e) {
        dest.error(e)
        return
      }
      dest.next(nextVal)
    },
    error: (err) => {
      dest.error(err)
    },
    complete: () => {
      dest.complete()
    }
  })

const debounceTime = time => {
  let interval
  return (dest) =>
    ({
      next: (val) => {
        clearInterval(interval)
        interval = setTimeout(() => dest.next(val), time)
      },
      error: (err) => {
        clearInterval(interval)
        dest.error(err)
        // optional complete() on error
      },
      complete: () => {
        clearInterval(interval)
        dest.complete()
      }
    })
}
```

The API looks very similar:

```javascript
const debounceTyping = compose(
  // ...same as before
)

const debouncTypingIntoLog = debounceTyping({
  next: (val) => console.log(val), // and other computation
  error: (err) => console.warn(err), // error related computation
  complete: () => console.log('Completed!') // completion related computation
})

document.querySelector('#searchBox').addEventListener(
  'input',
  debouncTypingIntoLog.next
)
```

We could add more fine control to our streams. For example, we can add some state to our operators, like a completed flag, in order to avoid pushing more values into a stream after completion.

There are several nice improvements we could make, but for now, our didactic streams are fine as they are.

## Producers

Our stream abstraction is, at its core, a chain of functions, each in charge to call the next one. As you saw, streams don’t produce the values that they receive.

In more complex reactive systems, some special operators or some producers are used to abstract over event emission (DOM events, HTTP, intervals, sync data and so on) and emit values into a “listening” chain of operators.

We can implement simple producers to complete our reactive system. First, let’s create a producer that will push values into a single stream. We implement two of them (created from producer’s factories), periodic will emit values regularly after each period amount of time, fromEvent binds a stream to a DOM event.

```javascript
const periodic = (period) => {
  let counter = 0
  return {
    start: (listener) => {
      let id = setInterval(() => listener.next(counter++), period)
      return () => {
        clearInterval(id)
        listener.complete()
      }
    }
  }
}

const fromEvent = (eventType, eventTarget) => {
  return {
    start: (listener) => {
      eventTarget.addEventListener(eventType, listener.next)
      return () => {
        eventTarget.removeEventListener(eventType, listener.next)
        listener.complete()
      }
    }
  }
}
```

Producers all have a common interface. The start method needs a listener (an object with next, error, complete methods, like a stream which was already prepared with a final destination). The start call will initiate the event emission into the stream/listener, while the returned value is an “unsubscribe” function used by the caller to stop the producer and to free resources (like the interval or the DOM binding).

Here’s how to use such producers with a simple object as listener.

```javascript
// example with a SIMPLE OBJECT as LISTENER
const periodicProducer = periodic(500)

const unsub = periodicProducer.start({
  next: (val) => console.log(val),
  error: (err) => console.warn(err),
  complete: () => console.log('Completed!')
})
// if we call again start on periodicProducer
// we will initiate different and independents event flows
// 1
// 2
// 3
// ...
unsub()
// Completed!
```

Here’s how to use such producers with a stream as listener.

```javascript
// example with a STREAM as LISTENER
const streamIntoLog = compose(
 debounceTime(800),
 tap(() => console.log('Clicked!')),
 asyncMap(() => httpJSON.get('SOME_API')),
 map(data => { /* computation */ })
)({
  next: (val) => console.log('Val: ' + val),
  error: (err) => console.warn(err),
  complete: () => console.log('Completed!')
})

const unsub2 = fromEvent('click', myButtonDOM).start(streamIntoLog)
// click a few times on the button, wait debounce (last click) and HTTP response delay
// Val: <data from api> 
unsub2()
// Completed!
```

We can also implement a producer that broadcasts the same events to multiple streams. Here’s a simple periodic implementation:

```javascript
const periodic = (period) => {
  let counter = 0
  let listeners = []
  return {
    add(listener) {
      listeners.push(listener)
      return this
    },
    start() {
      let id = setInterval(() => {
        counter++
        listeners.forEach(l => l.next(counter))
      }, period)
      return () => {
        clearInterval(id)
        listeners.forEach(l => l.complete())
      }
    }
  }
}
```

We can also build a producer to make HTTP request easily, something to be used like http.HTTPmethod(URl).start(listener). To be honest, we can implement producers for every need. As you can see, there's a lot of improvements and new concepts that we can add to our system!

### Conclusions
We have created a simple and basic reactive system to handle events and data flows in a declarative way. The system is flexible and extendible thanks to multiple operators, indeed we can also create new of them based on different needings (the obvious choice is to create a library of operators).

The core logic of the system is that each operator is responsible for calling the next one in the stream, so sync and async functions can be simply handled without overhead. Furthermore, our streams can control events over time. We can also easily manage the flow of data, even if it is needed to make interdependent async operations.

The system is based on the emission of values in a destination, indeed each operator needs the next argument. What if we change our paradigm? The next step will be to subscribe to a source instead of pushing data into a destination.

Maybe we could build a basic abstraction/primitive (an Observable) that can kind of listen to other Observables. When a listener (an Observer) is provided to the chain or to a single Observable, the first one in the chain will act as a producer of events, pushing values into the sequence of “listeners” Observables.

The latter philosophy is used by libraries such RxJS and it has several advantages over our method. With the knowledge and the mindset developed in this post, we will implement such a system in the next articles, creating our version of RxJS. Hope to see you there! 😁

PS: English is not my mother tongue so errors might be just around the corner. Feel free to comment with corrections!

## Resources:

[Source II](https://dev.to/mr_bertoli/reactive-programming-an-introductory-model-2jok) - [Source II](https://dev.to/mr_bertoli/an-adequate-introduction-to-functional-programming-1gcl)