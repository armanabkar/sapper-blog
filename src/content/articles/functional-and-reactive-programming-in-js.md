---
title: Introduction to Functional Programming in Swift
date: "2021-01-01T08:38:00.000Z"
---

Getting started with functional programming and how to write declarative rather than imperative code ...

<!-- more -->

<h2 align="center">
  <img src="https://koenig-media.raywenderlich.com/uploads/2019/01/FunctionalProgramming-feature-2.png" width="250px" />
  <br>
</h2>

Swift’s grand entrance to the programming world at WWDC in 2014 was much more than just an introduction of a new language. It facilitated new approaches to software development for the iOS and macOS platforms.

This tutorial focuses on one of these approaches: Functional Programming, or FP for short. You’ll get an introduction to a broad range of ideas and techniques used in FP.

As you go through this tutorial, you’re going to work in a Playground. You can find the completed Playground by using the Download Materials button at the top or bottom of this page.

## Getting Started

Create a new empty playground in Xcode so you can follow along with the tutorial by selecting File ▸ New ▸ Playground….

<h2 align="center">
  <img src="https://koenig-media.raywenderlich.com/uploads/2018/11/new-playground-xcode-1-445x320.png" width="500px" />
  <br>
</h2>

Set up your playground so you can see the Results Panel and the console by dragging the splits.

<h2 align="center">
  <img src="https://koenig-media.raywenderlich.com/uploads/2018/11/new-playground-480x313.png" width="500px" />
  <br>
</h2>

Now, delete everything from the playground, then add this line:

```swift
import Foundation
```

You’ll start by reviewing some basic theory to warm up your brain.

## Imperative Programming Style

When you first learned to code, you probably learned imperative style. How does imperative style work?

Add the following code to your playground:

```swift
var thing = 3
//some stuff
thing = 4
```

That code is normal and reasonable. First, you create a variable called ```thing``` that equals 3, then you command ```thing``` to be 4 later in time.

That’s imperative style in a nutshell. You create a variable with some data, then you tell that variable to be something else.

## Functional Programming Concepts

In this section, you’ll get an introduction to some key concepts in FP. Many papers that discuss FP single out immutable state and lack of side effects as the most important aspects of FP, so you’ll start there.

## Immutability and Side Effects

No matter which programming language you learned first, one of the initial concepts you likely learned was that a variable represents data, or state. If you step back for a moment to think about the idea, variables can seem quite odd.

The term “variable” implies a quantity that varies as the program runs. Thinking of the quantity ```thing``` from a mathematical perspective, you’ve introduced time as a key parameter in how your software behaves. By changing the variable, you create mutable state.

For a demonstration, add this code to your playground:

```swift
func superHero() {
  print("I'm batman")
  thing = 5
}

print("original state = \(thing)")
superHero()
print("mutated state = \(thing)")
```

Holy mysterious change! Why is ```thing``` now 5? That change is called a side effect. The function ```superHero()``` changes a variable that it didn’t even define itself.

By itself, or in a simple system, mutable state is not necessarily a problem. Problems arise when connecting many objects together, such as in a large object-oriented system. Mutable state can produce headaches by making it hard to understand what value a variable has and how that value changes over time.

For example, when writing code for a multi-threaded system, if two or more threads access the same variable concurrently, they may modify or access it out of order. This leads to unexpected behavior. That unexpected behavior includes race conditions, dead locks and many other problems.

Imagine if you could write code where state never mutated. A whole slew of issues that occur in concurrent systems would vanish. Systems that work like this have immutable state, meaning that state is not allowed to change over the course of a program.

The key benefit of using immutable data is that the units of code that use it are free of side effects. The functions in your code don’t alter elements outside of themselves, and no spooky effects appear when function calls occur. Your program works predictably because, without side effects, you can easily reproduce its intended effects.

This tutorial covers FP at a high level, so it’s helpful to consider the concepts in a real world situation. In this case, imagine you’re building an app for an amusement park, and that the park’s back-end server provides ride data via a REST API.

## Creating a Model Amusement Park

Set up the data structure by adding this code to your playground:

```swift
enum RideCategory: String, CustomStringConvertible {
  case family
  case kids
  case thrill
  case scary
  case relaxing
  case water

  var description: String {
    return rawValue
  }
}

typealias Minutes = Double
struct Ride: CustomStringConvertible {
  let name: String
  let categories: Set<RideCategory>
  let waitTime: Minutes

  var description: String {
    return "Ride –\"\(name)\", wait: \(waitTime) mins, " +
      "categories: \(categories)\n"
  }
}
```

Next, create some data using that model:

```swift
let parkRides = [
  Ride(name: "Raging Rapids",
       categories: [.family, .thrill, .water],
       waitTime: 45.0),
  Ride(name: "Crazy Funhouse", categories: [.family], waitTime: 10.0),
  Ride(name: "Spinning Tea Cups", categories: [.kids], waitTime: 15.0),
  Ride(name: "Spooky Hollow", categories: [.scary], waitTime: 30.0),
  Ride(name: "Thunder Coaster",
       categories: [.family, .thrill],
       waitTime: 60.0),
  Ride(name: "Grand Carousel", categories: [.family, .kids], waitTime: 15.0),
  Ride(name: "Bumper Boats", categories: [.family, .water], waitTime: 25.0),
  Ride(name: "Mountain Railroad",
       categories: [.family, .relaxing],
       waitTime: 0.0)
]
```

Since you declare ```parkRides``` with ```let``` instead of ```var```, both the array and its contents are immutable.

Try to modify one of the items in the array, via the following:

```swift
parkRides[0] = Ride(name: "Functional Programming",
                    categories: [.thrill], waitTime: 5.0)
```

That produces a compiler error, which is good. You want the Swift compiler to stop you from changing the data.

Now, remove those lines so you can continue with the tutorial.

## Modularity

Working with modularity is like playing with children’s building bricks. You have a box of simple bricks that you can use to build a large and complex system by joining them together. Each brick has a single job. You want your code to have the same effect.

Suppose you need an alphabetical list of all the rides’ names. Start out doing this imperatively, which means by utilizing mutable state. Add the following function to the bottom of the playground:

```swift
func sortedNamesImp(of rides: [Ride]) -> [String] {

  // 1
  var sortedRides = rides
  var key: Ride

  // 2
  for i in (0..<sortedRides.count) {
    key = sortedRides[i]

    // 3
    for j in stride(from: i, to: -1, by: -1) {
      if key.name.localizedCompare(sortedRides[j].name) == .orderedAscending {
        sortedRides.remove(at: j + 1)
        sortedRides.insert(key, at: j)
      }
    }
  }

  // 4
  var sortedNames: [String] = []
  for ride in sortedRides {
    sortedNames.append(ride.name)
  }

  return sortedNames
}

let sortedNames1 = sortedNamesImp(of: parkRides)
```

Your code accomplishes the following tasks:

1. Create a variable to hold the sorted rides.
2. Loop over all the rides passed into the function.
3. Sort the rides using an Insertion Sort sort algorithm.
4. Loop over the sorted rides to gather the names.

Add the following test to the playground to verify that this function behaves as intended:

```swift
func testSortedNames(_ names: [String]) {
  let expected = ["Bumper Boats",
                  "Crazy Funhouse",
                  "Grand Carousel",
                  "Mountain Railroad",
                  "Raging Rapids",
                  "Spinning Tea Cups",
                  "Spooky Hollow",
                  "Thunder Coaster"]
  assert(names == expected)
  print("✅ test sorted names = PASS\n-")
}

print(sortedNames1)
testSortedNames(sortedNames1)
```

You now know that if you change your sorting routine in the future (for example, to make it functional :]), that you can detect any bug that occurs.

From the perspective of a caller to ```sortedNamesImp(of:)```, it provides a list of rides, and then outputs the list of sorted names. Nothing outside of ```sortedNamesImp(of:)``` changes.

You can prove this with another test. Add the following code to the end of the playground:

```swift
var originalNames: [String] = []
for ride in parkRides {
  originalNames.append(ride.name)
}

func testOriginalNameOrder(_ names: [String]) {
  let expected = ["Raging Rapids",
                  "Crazy Funhouse",
                  "Spinning Tea Cups",
                  "Spooky Hollow",
                  "Thunder Coaster",
                  "Grand Carousel",
                  "Bumper Boats",
                  "Mountain Railroad"]
  assert(names == expected)
  print("✅ test original name order = PASS\n-")
}

print(originalNames)
testOriginalNameOrder(originalNames)
```

In this test, you gather the names of the list of rides that you passed as a parameter and test that order against the expected order.

In the results area and console, you’ll see that sorting rides inside of ```sortedNamesImp(of:)``` didn’t affect the input list. The modular function you’ve created is semi-functional. The logic of sorting rides by name is a single, testable, modular and reusable function.

The imperative code inside ```sortedNamesImp(of:)``` made for a long and unwieldy function. The function is hard to read and you cannot easily work out what it does. In the next section, you’ll learn techniques to simplify the code within a function like ```sortedNamesImp(of:)``` even further.

## First-Class and Higher-Order Functions

In FP languages, functions are first-class citizens. You treat functions like other objects that you can assign to variables.

Because of this, functions can also accept other functions as parameters or return other functions. Functions that accept or return other functions are called higher-order functions.

In this section, you’ll work with three of the most common higher-order functions in FP languages: ```filter```, ```map``` and ```reduce```.

## Filter

In Swift, ```filter(_:)``` is a method on ```Collection``` types, such as Swift arrays. It accepts another function as a parameter. This other function accepts a single value from the array as input, checks whether that value belongs and returns a ```Bool```.

```filter(_:)``` applies the input function to each element of the calling array and returns another array. The output array contains only the array elements whose parameter function returns ```true```.

Try this simple example:

```swift
let apples = ["🍎", "🍏", "🍎", "🍏", "🍏"]
let greenapples = apples.filter { $0 == "🍏"}
print(greenapples)
```

There are three green apples in the input list, so you’ll see three green apples in the output.

Think back to your list of actions that ```sortedNamesImp(of:)``` performs:

1. Loops over all the rides passed to the function.
2. Sorts the rides by name.
3. Gathers the names of the sorted rides.

Instead of thinking about this imperatively, think of it declaratively, i.e. by only thinking about what you want to happen instead of how. Start by creating a function that has a ```Ride``` object as an input parameter to the function:

```swift
func waitTimeIsShort(_ ride: Ride) -> Bool {
  return ride.waitTime < 15.0
}
```

The function ```waitTimeIsShort(_:)``` accepts a ```Ride``` and returns ```true``` if the ride’s wait time is less than 15 minutes; otherwise, it returns ```false```.

Call ```filter(_:)``` on your park rides and pass in the new function you just created:

```swift
let shortWaitTimeRides = parkRides.filter(waitTimeIsShort)
print("rides with a short wait time:\n\(shortWaitTimeRides)")
```

In the playground output, you’ll only see Crazy Funhouse and Mountain Railroad in the call to ```filter(_:)```’s output, which is correct.

Since Swift functions are also known as closures, you can produce the same result by passing a trailing closure to ```filter``` and using closure syntax:

```swift
let shortWaitTimeRides2 = parkRides.filter { $0.waitTime < 15.0 }
print(shortWaitTimeRides2)
```

Here, ```filter(_:)``` takes each ride in ```parkRides``` — represented by ```$0``` — looks at its ```waitTime``` property and tests if it’s less than 15 minutes. You are being declarative and telling the program what you want it to do. This can look rather cryptic the first few times you work with it.

## Map

The ```Collection``` method ```map(_:)``` accepts a single function as a parameter. It outputs an array of the same length after applying that function to each element of the collection. The return type of the mapped function does not have to be the same type as the collection elements.

Try this:

```swift
let oranges = apples.map { _ in "🍊" }
print(oranges)
```

You map each apple to an orange producing a feast of oranges :].

You can apply ```map(_:)``` to the elements of your ```parkRides``` array to get a list of all the ride names as strings:

```swift
let rideNames = parkRides.map { $0.name }
print(rideNames)
testOriginalNameOrder(rideNames)
```

You’ve proved that using ```map(_:)``` to get the ride names does the same thing as iterating across the collection, just like you did earlier.

You can also sort the ride names as shown below, when you use the ```sorted(by:)``` method on the ```Collection``` type to perform the sorting:

```swift
print(rideNames.sorted(by: <))
```

The ```Collection``` method ```sorted(by:)``` takes a function that compares two elements and returns a ```Bool``` as a parameter. Because the operator ```<``` is a function in fancy clothing, you can use Swift shorthand for the trailing closure ```{ $0 < $1 }```. Swift provides the left- and right-hand sides by default.

You can now reduce the code to extract and sort the ride names to only two lines, thanks to ```map(_:)``` and ```sorted(by:)```.

Re-implement sortedNamesImp(_:) as sortedNamesFP(_:) with the following code:

```swift
func sortedNamesFP(_ rides: [Ride]) -> [String] {
  let rideNames = parkRides.map { $0.name }
  return rideNames.sorted(by: <)
}

let sortedNames2 = sortedNamesFP(parkRides)
testSortedNames(sortedNames2)
```

Your declarative code is easier to read and you can figure out how it works without too much trouble. The test proves that ```sortedNamesFP(_:)``` does the same thing as ```sortedNamesImp(_:)```.

## Reduce

The ```Collection``` method ```reduce(_:_:)``` takes two parameters: The first is a starting value of an arbitrary type ```T``` and the second is a function that combines a value of that same type ```T``` with an element in the collection to produce another value of type ```T```.

The input function applies to each element of the calling collection, one by one, until it reaches the end of the collection and produces a final accumulated value.

For example, you can reduce those oranges to some juice:

```swift
let juice = oranges.reduce("") { juice, orange in juice + "🍹"}
print("fresh 🍊 juice is served – \(juice)")
```

Here you start with an empty string. You then add a 🍹 to the string for each orange. This code can juice any array so be careful what you put in it :].

To be more practical, add the following method that lets you know the total wait time of all the rides in the park.

```swift
let totalWaitTime = parkRides.reduce(0.0) { (total, ride) in 
  total + ride.waitTime 
}
print("total wait time for all rides = \(totalWaitTime) minutes")
```

This function works by passing the starting value of 0.0 into ```reduce``` and using trailing closure syntax to add how much time each ride contributes to the total wait time. The code uses Swift shorthand again to omit the ```return``` keyword. By default, you return the result of ```total + ride.waitTime```.

In this example, the iterations look like this:

```
Iteration    initial    ride.waitTime    resulting total
    1          0            45            0 + 45 = 45
    2         45            10            45 + 10 = 55
    …
    8        200             0            200 + 0 = 200
```

As you can see, the resulting total carries over as the initial value for the following iteration. This continues until ```reduce``` iterates through every ```Ride``` in ```parkRides```. This allows you to get the total with one line of code!

## Advanced Techniques

You have learned about some of the common FP methods. Now it’s time to take things a bit further with some more function theory.

## Partial Functions

Partial functions allow you to encapsulate one function within another. To see how this works, add the following method to the playground:

```swift
func filter(for category: RideCategory) -> ([Ride]) -> [Ride] {
  return { rides in
    rides.filter { $0.categories.contains(category) }
  }
}
```

Here, ```filter(for:)``` accepts a ```RideCategory``` as its parameter and returns a function of type ```([Ride]) -> [Ride]```. The output function takes an array of Ride objects and returns an array of Ride objects filtered by the provided category.

Check the filter here by looking for rides suitable for small children:

```swift
let kidRideFilter = filter(for: .kids)
print("some good rides for kids are:\n\(kidRideFilter(parkRides))")
```

You should see Spinning Tea Cups and Grand Carousel in the console output.

## Pure Functions

A primary concept in FP which lets you reason about program structure, as well as test program results, is the idea of a pure function.

A function is pure if it meets two criteria:

- The function always produces the same output when given the same input, e.g., the output only depends on its input.
- The function creates zero side effects outside of it.

Add the following pure function to your playground:

```swift
func ridesWithWaitTimeUnder(_ waitTime: Minutes, 
    from rides: [Ride]) -> [Ride] {
  return rides.filter { $0.waitTime < waitTime }
}
```

```ridesWithWaitTimeUnder(_:from:)``` is a pure function because its output is always the same when given the same wait time and the same list of rides.

With a pure function, it’s easy to write a good unit test against the function. Add the following test to your playground:

```swift
let shortWaitRides = ridesWithWaitTimeUnder(15, from: parkRides)

func testShortWaitRides(_ testFilter:(Minutes, [Ride]) -> [Ride]) {
  let limit = Minutes(15)
  let result = testFilter(limit, parkRides)
  print("rides with wait less than 15 minutes:\n\(result)")
  let names = result.map { $0.name }.sorted(by: <)
  let expected = ["Crazy Funhouse",
                  "Mountain Railroad"]
  assert(names == expected)
  print("✅ test rides with wait time under 15 = PASS\n-")
}

testShortWaitRides(ridesWithWaitTimeUnder(_:from:))
```

Notice how you pass the function ridesWithWaitTimeUnder(_:from:) to the test. Remember that functions are first-class citizens and you can pass them around like any other data. This will come in handy for the next section.

Also, once again you use ```map(_:)``` and ```sorted(by:)``` to extract the names to run your test against. You’re using FP to test your FP skills.

## Referential Transparency

Pure functions are related to the concept of referential transparency. An element of a program is referentially transparent if you can replace it with its definition and always produce the same result. It makes for predictable code and allows the compiler to perform optimizations. Pure functions satisfy this condition.

You can verify that the function ```ridesWithWaitTimeUnder(_:from:)``` is referentially transparent by passing its body to ```testShortWaitRides(_:)```:

```swift
testShortWaitRides({ waitTime, rides in
    return rides.filter{ $0.waitTime < waitTime }
})
```

In this code, you took the body of ```ridesWithWaitTimeUnder(_:from:)``` and passed that directly to the test ```testShortWaitRides(_:)``` wrapped in closure syntax. That’s proof that ```ridesWithWaitTimeUnder(_:from:)``` is referentially transparent.

Referential transparency comes in handy when you’re refactoring some code and you want to be sure that you’re not breaking anything. Referentially transparent code is not only easy to test, but it also lets you move code around without having to verify implementations.

## Recursion

The final concept to discuss is recursion. Recursion occurs whenever a function calls itself as part of its function body. In functional languages, recursion replaces many of the looping constructs that you use in imperative languages.

When the function’s input leads to the function calling itself, you have a recursive case. To avoid an infinite stack of function calls, recursive functions need a base case to end them.

You’re going to add a recursive sorting function for your rides. First make Ride conform to ```Comparable``` using the following extension:

```swift
extension Ride: Comparable {
  public static func <(lhs: Ride, rhs: Ride) -> Bool {
    return lhs.waitTime < rhs.waitTime
  }

  public static func ==(lhs: Ride, rhs: Ride) -> Bool {
    return lhs.name == rhs.name
  }
}
```

In this extension, you use operator overloading to create functions that allow you to compare two rides. You can also see the full function declaration for the ```<``` operator that you used earlier in ```sorted(by:)```.

One ride is less than another ride if the wait time is less, and the rides are equal if the rides have the same name.

Now, extend ```Array``` to include a ```quickSorted``` method:

```swift
extension Array where Element: Comparable {
  func quickSorted() -> [Element] {
    if self.count > 1 {
      let (pivot, remaining) = (self[0], dropFirst())
      let lhs = remaining.filter { $0 <= pivot }
      let rhs = remaining.filter { $0 > pivot }
      return lhs.quickSorted() + [pivot] + rhs.quickSorted()
    }
    return self
  }
}
```

This extension allows you to sort an array as long as the elements are ```Comparable```.

The Quick Sort algorithm first picks a pivot element. You then divide the collection into two parts. One part holds all the elements that are less than or equal to the pivot, the other holds the remaining elements greater than the pivot. Recursion is then used to sort the two parts. Note that by using recursion, you don’t need to use a mutable state.

Verify your function works by entering the following code:

```swift
let quickSortedRides = parkRides.quickSorted()
print("\(quickSortedRides)")


func testSortedByWaitRides(_ rides: [Ride]) {
  let expected = rides.sorted(by:  { $0.waitTime < $1.waitTime })
  assert(rides == expected, "unexpected order")
  print("✅ test sorted by wait time = PASS\n-")
}

testSortedByWaitRides(quickSortedRides)
```

Here, you check that your solution matches the expected value from the trusted Swift standard library function.

Keep in mind that recursive functions have extra memory usage and runtime overhead. You won’t need to worry about these problems until your data sets become much larger.

## Imperative vs. Declarative Code Style

In this section, you’ll combine what you’ve learned about FP to get a clear demonstration of the benefits of functional programming.

Consider the following situation:

A family with young kids wants to go on as many rides as possible between frequent bathroom breaks. They need to find which kid-friendly rides have the shortest lines. Help them out by finding all family rides with wait times less than 20 minutes and sort them by the shortest to longest wait time.

## Solving the Problem with the Imperative Approach

Think about how you would solve this problem with an imperative algorithm. Have a try at implementing your own solution to the problem.

Your solution will likely be similar to:

```swift
var ridesOfInterest: [Ride] = []
for ride in parkRides where ride.waitTime < 20 {
  for category in ride.categories where category == .family {
    ridesOfInterest.append(ride)
    break
  }
}

let sortedRidesOfInterest1 = ridesOfInterest.quickSorted()
print(sortedRidesOfInterest1)
```

Add this to your playground and execute it. You should see that Mountain Railroad, Crazy Funhouse and Grand Carousel are the best ride choices and that the list is in order of increasing wait time.

As written, the imperative code is fine, but a quick glance does not give a clear, immediate idea of what it’s doing. You have to pause to look at the algorithm in detail to grasp it. Would the code be easy to understand when you return to do maintenance six months later, or if you’re handing it off to a new developer?

Add this test to compare an FP approach to your imperative solution:

```swift
func testSortedRidesOfInterest(_ rides: [Ride]) {
  let names = rides.map { $0.name }.sorted(by: <)
  let expected = ["Crazy Funhouse",
                  "Grand Carousel",
                  "Mountain Railroad"]
  assert(names == expected)
  print("✅ test rides of interest = PASS\n-")
}

testSortedRidesOfInterest(sortedRidesOfInterest1)
```

## Solving the Problem with a Functional Approach

You can make your code a lot more self-explanatory with an FP solution. Add the following code to your playground:

```swift
let sortedRidesOfInterest2 = parkRides
    .filter { $0.categories.contains(.family) && $0.waitTime < 20 }
    .sorted(by: <)
```

Verify that this line of code produces the same output as the imperative code by adding:

```swift
testSortedRidesOfInterest(sortedRidesOfInterest2)
```

In one line of code, you’ve told Swift what to calculate. You want to filter your ```parkRides``` to ```.family``` rides with wait times less than 20 minutes and then sort them. That cleanly solves the problem stated above.

The resulting code is declarative, meaning it’s self-explanatory and reads like the problem statement it solves.

This is different from imperative code, which reads like the steps the computer has to take to solve the problem statement.

## The When and Why of Functional Programming

Swift is not purely a functional language, but it does combine multiple programming paradigms to give you flexibility for app development.

A great place to start working with FP techniques is in your Model layer and anywhere that your app’s business logic appears. You’ve seen how easy it is to create discrete tests for that logic.

For user interfaces, it’s less clear to see where you’ll want to use FP techniques. Reactive programming is an example of an FP-like approach for UI development. For example, RxSwift is a reactive library for iOS and macOS programming.

By taking a functional, declarative approach, your code becomes more concise and clear. Plus, your code will be easier to test when it’s isolated into modular functions which are free from side effects.

When you want to maximize the full potential of your multi-core CPU, minimizing side effects and issues from concurrency is important. FP is a great tool to have in your skill set for those kind of problems.

## Resources:

[Source](https://www.raywenderlich.com/9222-an-introduction-to-functional-programming-in-swift)