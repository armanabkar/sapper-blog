---
title: Big O Notation
date: "2021-02-11T08:38:00.000Z"
---

Almost all coding challenges have multiple approaches to solving them. Though all the different approaches ...

<!-- more -->

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RWnbmm__--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/g23ajra0t77i0v1oj7y2.jpg" width="600px" />
  <br>
</h2>

Almost all coding challenges have multiple approaches to solving them. Though all the different approaches get the job done, it is possible to rank them according to performance and efficiency. A standard system used by engineers to achieve this is the Big O Notation.

## What is Big O Notation?

Big O Notation is a way of classifying algorithms by assigning mathematical expressions based on the algorithm's runtime (time complexity) and memory/space requirement (space complexity).

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--L9ofhoxD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/gh1kib4sfcj83347mx7f.jpeg" width="600px" />
  <br>
</h2>

### Benefits
Big O Notation is important because

- It provides a precise vocabulary or terminology in talking about the performance of algorithms.
- It is useful for discussing trade-offs between different approaches employed in algorithm design.
- It helps in debugging code and figuring out reasons for slow performance, crashes, identifying parts of the code that are inefficient and identifying pain points.

## Time and space complexity

In this section, I'll be attempting to explain the basic concepts of Big O Notation by analyzing and classifying two valid solutions to a simple code challenge.

### Question 1

Write a function that calculates the sum of all numbers from 1 up to and including a given number n.

#### Solution 1
```javascript
function addUpto(n) {
  return n * (n + 1) / 2;
}
```

#### Solution 2
```javascript
function addUpto(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

Which of the above solutions is better?

### Discussion

Before we answer the above question, we would have to define what better means.

- Does better mean faster?
- Does better mean less memory-intensive (the data that is stored in memory each time the function is called)?

## Time Complexity
### Let's take the first question " Does better mean faster?"

In thinking of the speed of algorithms, it may seem intuitive to record the time it takes for an algorithm to complete its task but doing that will lead to inconsistencies. This is because computers vary in hardware and computing power. A computer with a lot more resources will take a shorter period to complete a given algorithm than a computer with fewer resources.

So instead of counting seconds, which change based on computing power, consistent and standardized results can be achieved by counting the number of simple operations the computer has to perform within an algorithm. The time it takes for a computer to execute an algorithm is directly proportional to the number of operations it has to perform. Hence the greater the number of operations the longer it takes to execute.

Now that we have established the criteria for analyzing an algorithm's runtime, let's count the number of simple operations in our solutions

#### Solution 1
```javascript
function addUpto(n) {
  return n * (n + 1) / 2;
}
```

Solution 1 has a total of three (3) simple operations.

- one multiplication ```n * ...```
- one addition ```n + 1``` and
- one division ```.. / 2``` The number of operations in solution 1 does not change with increasing or decreasing the magnitude of the input(n). No matter how small or large n is, the number of operations will always be 3.

#### Solution 2
```javascript
function addUpto(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

In solution 2

- line 2 shows 1 variable assignment ```let total = 0;```
- line 3 shows:
  - 1 variable assignment ```let i = 1;```,
  - n comparisons ```i <= n;```,
  - n additions and n variable assignments ```i++```.
- line 4 shows n additions and n variable assignments.
It also makes use of a loop which runs n times. Thus, if n is 5, the loop will run five times. However, depending on what you count, the number of operations can be as low as ```2n``` or as high as ```5n + 2```. Hence regardless of being precise, the number of operations grows roughly proportionally with n.

Consequently, unlike solution 1, counting the number of operations in solution 2 is a lot more complicated. Big O Notation doesn't necessarily care about precision only about general trends.

Based on the above, "time complexity with respect to big O notation is the measure of how the runtime of an algorithm grows as its input grows."

The various terminology available via Big O notation in classifying the runtime / time complexity of algorithms includes the following.

### Constant O(1)

An algorithm with a constant time complexity does not have its runtime significantly affected by an increase or decrease in the magnitude of its input(n). As the value of the input(n) grows the runtime of the algorithm fundamentally stays constant.

### Linear O(n)

An algorithm is described as having a linear time complexity when its runtime scales proportionally with its input(n).

### Quadratic O(n^2)

An algorithm with a quadratic time complexity has its runtime scaling at a rate which is approximately the square of its input(n). Thus, as the value of n increases the runtime of the algorithm increases by n^2.

#### Solution 1
```javascript
function addUpto(n) {
  return n * (n + 1) / 2;
}
```

> So the Big O of solution 1 is O(1) (read as O of 1). This means that the number of simple operations the computer has to do is constant as n increases.

#### Solution 2
```javascript
function addUpto(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

> Solution 2 has a big O of O(n) (read as O of n). This means that the number of operations is bound by a multiple of its input(n).

## Space Complexity
Space complexity is usually concerned with the amount of memory needed to run a given algorithm.

> Auxiliary space complexity: space/memory required by the algorithm without considering the space taken by the inputs.

For the scope of this blog post, space complexity refers to auxiliary space complexity.

### Helpful tips when thinking about space complexity

- Most primitives (booleans, numbers, undefined, null) are constant space ```O(1)```.
- Strings require ```O(n)``` space (where n is the length of the string).
- Reference types are generally ```O(n)```, where n is the length of the array or the number of keys in the case of objects.

```javascript
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
     total += arr[i];
  }
  return total;
}
```

The above function adds all numerical elements of a given array and returns the total.
Since we are only concerned about the memory/space required by the function/algorithm alone, we are going to disregard the length of the array provided to the function. So the only space-consuming elements we are concerned about are on line 2 and 3.

- On line 2 and 3, no matter the size/length of the array provided to the function/algorithm, it going consume the space of a single digit (0). line 2 => ```let total = 0```. and line 3 => ```let i = 0```

> So the big O of the sum function with respect to auxiliary space complexity is O(1).

```javascript
function double(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
     newArr.push(2 * arr[i]);
  }
  return newArr;
}
```

The function double takes in an array of numbers and returns a new array with each element of the input array doubled.

One thing to note is that an empty array is instantiated and based on the length of the input array, the memory required by the instantiated array increases proportionally on line 4. So the space complexity of the double function is ```O(n)```.

### Brief introduction to Logarithms

Although some of the common algorithms can be classified under constant ```O(1)```, linear ```O(n)``` and quadratic ```O(n^2)``` space and time complexities, there are a lot of algorithms that are not adequately described by the above. These involve more complex mathematical expressions such as logarithms.

Logarithms are the inverse of exponentiation. Just as division and multiplication are a pair, exponentiation and logarithms are a pair.

Logarithmic space and time complexities are expressed with ```O(log n)``` and ```O(nlog n)```

## Common Data Structure Operations

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--c2AW8Ymp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/j7t6colddwihfy86qxsb.png" width="600px" />
  <br>
</h2>

## Array Sorting Algorithms

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--CHm4i8Mt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/pqhhinuwq1q0y9rwwbac.png" width="600px" />
  <br>
</h2>

## Conclusion

To sum this all up, here are few things to remember about Big O Notation.

- To analyze the performance of an algorithm, we use Big O Notation
- Big O Notation can provide us with a high-level understanding of the time or space complexity of an algorithm.
- Big O Notation doesn't necessarily care about precision only about general trends (linear, quadratic or constants)
- The time or space complexity (as measured by Big O) depends only on the algorithm, and not the hardware used to run the algorithm.

Cover image by [Jeremy Perkins on Unsplash](https://unsplash.com/@jeremyperkins)

[Source 1](https://dev.to/adafia/big-o-notation-3oi6#obj-2)

[Source 2](https://dev.to/sofiajonsson/basics-big-o-notation-a6m)