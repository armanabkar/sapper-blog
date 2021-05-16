---
title: Top 8 Data Structures for Interviews + Big O Notation
date: "2020-12-31T08:38:00.000Z"
---

Almost all problems require to demonstrate a deep understanding of data structures ...

<!-- more -->

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RWnbmm__--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/g23ajra0t77i0v1oj7y2.jpg" width="600px" />
  <br>
</h2>

Niklaus Wirth, a Swiss computer scientist, wrote a book in 1976 titled:

> Algorithms + Data Structures = Programs

40+ years later, that equation still holds true. That's why software engineering candidates have to demonstrate their understanding of data structures along with their application.

Almost all problems require the candidate to demonstrate a deep understanding of data structures. It doesn't matter whether you have just graduated (from a university or coding bootcamp), or you have decades of experience.

Sometimes interview questions explicitly mention a data structure, e.g. "given a binary tree." Other times it's implicit, e.g. "we want to track the number of books associated with each author."

Learning data structures is essential even if you're just trying to get better at your current job. Let's start with understanding the basics.

If you are looking for resources on data structures for coding interviews, look at the interactive & challenge based courses: Mastering Data Structures for Coding Interviews which features data structure interview courses in Python, Java, C++, and JavaScript.

For more advanced questions, look at Grokking the Coding Interview: Patterns for Coding Questions.

## What is a Data Structure?

Simply put, a data structure is a container that stores data in a specific layout. This "layout" allows a data structure to be efficient in some operations and inefficient in others. Your goal is to understand data structures so that you can pick the data structure that's most optimal for the problem at hand.

## Why do we need Data Structures?

As data structures are used to store data in an organized form, and data being the most crucial entity in computer science, the true worth of data structures is clear.

No matter what problem are you solving, in one way or the other you have to deal with data - whether it's an employee's salary, stock prices, grocery list, or even a simple telephone directory.

Based on different scenarios, data needs to be stored in a specific format, and we have a handful of data structures that cover our need to store data in different formats.

## Commonly used Data Structures

Let's first list the most commonly used data structures, and then we'll cover them in more detail:

- Arrays
- Stacks
- Queues
- Linked List
- Trees
- Graphs
- Tries (They are effectively trees but it's still good to call them out separately).
- Hash Tables

## Arrays

An array is the simplest and most widely used data structure. Other data structures like stacks and queues are derived from arrays.

Here's an image of a simple array of size 4, containing elements (1,2,3 and 4):

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--BoZFOixU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/d6r1v3nie2chznvyckfa.png" width="600px" />
  <br>
</h2>

Each data element is assigned a positive numerical value called the Index, which corresponds to the position of that item in the array. The majority of languages define the starting index of the array as 0.

The following are the two types of arrays:

- One-dimensional arrays (as shown above)
- Multi-dimensional arrays (arrays within arrays)

### Basic Operations on Arrays

- Insert - Inserts an element at given index
- Get - Returns the element at given index
- Delete - Deletes an element at given index
- Size - Get the total number of elements in an array

### Commonly asked Array interview questions

- Find the second minimum element of an array
- First non-repeating integers in an array
- Merge two sorted arrays
- Rearrange positive and negative values in an array

## Stacks

We are all familiar with the famous Undo option, which is present in almost every application. Ever wondered how it works? The idea: you store the previous states of your work (which are limited to a specific number), in the memory in such an order that the last one appears first. This can't be done just by using arrays. That is where the Stack comes in handy.

A real-life example of Stack could be a pile of books placed in a vertical order. In order to get the book that's somewhere in the middle, you will need to remove all the books placed on top of it. This is how the LIFO (Last In First Out) method works.
Here's an image of the stack containing three data elements (1,2 and 3), where 3 is at the top and will be removed first:

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s---1ciAACB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/xnfomtvmz0284rlasyha.png" width="600px" />
  <br>
</h2>

### Basic operations of the stack:

- Push - Inserts an element at the top
- Pop - Returns the top element, after removing from the stack
- isEmpty - Returns true if the stack is empty
- Top - Returns the top element without removing from the stack

### Commonly asked Stack interview questions

- Evaluate postfix expression using a stack
- Sort values in a stack
- Check balanced parentheses in an expression

## Queues

Similar to Stack, Queue is another linear data structure that stores the element in a sequential manner. The only significant difference between Stack and Queue is that instead of using the LIFO method, Queue implements FIFO method, which is short for First in First Out.

A perfect real-life example of Queue: a line of people waiting at a ticket booth. If a new person comes, he will join the line from the end, not from the start - and the person standing at the front will be the first to get the ticket and hence leave the line.

Here's an image of Queue containing four data elements (1,2,3 and 4), where 1 is at the top and will be removed first:

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Ua5MnwE9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/ltt8xj4sgrb21sux1bg3.png" width="600px" />
  <br>
</h2>

### Basic operations of Queue

- Enqueue() - Inserts element at the end of the queue
- Dequeue() - Removes an element from the start of the queue
- isEmpty() - Returns true if queue is empty
- Top() - Returns the first element of the queue

### Commonly asked Queue interview questions

- Implement stack using a queue
- Reverse first k elements of a queue
- Generate binary numbers from 1 to n using a queue

## Linked List

A linked list is another important linear data structure which might look similar to arrays at first but differs in memory allocation, internal structure and how basic operations of insertion and deletion are carried out.

A linked list is like a chain of nodes, where each node contains information like data and a pointer to the succeeding node in the chain. There's a head pointer, which points to the first element of the linked list, and if the list is empty then it simply points to null or nothing.

Linked lists are used to implement file systems, hash tables, and adjacency lists.
Here's a visual representation of the internal structure of a linked list:

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--y7tQytQ7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/xxrsac9g2afohilzw14p.png" width="600px" />
  <br>
</h2>

Following are the types of linked lists:

- Singly Linked List (Unidirectional)
- Doubly Linked List (Bi-directional)
  
### Basic operations of Linked List:

- InsertAtEnd - Inserts given element at the end of the linked list
- InsertAtHead - Inserts given element at the start/head of the linked list
- Delete - Deletes given element from the linked list
- DeleteAtHead - Deletes first element of the linked list
- Search - Returns the given element from a linked list
- isEmpty - Returns true if the linked list is empty

### Commonly asked Linked List interview questions
- Reverse a linked list
- Detect loop in a linked list
- Return Nth node from the end in a linked list
- Remove duplicates from a linked list

## Graphs

A graph is a set of nodes that are connected to each other in the form of a network. Nodes are also called vertices. A pair(x,y) is called an edge, which indicates that vertex x is connected to vertex y. An edge may contain weight/cost, showing how much cost is required to traverse from vertex x to y.

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--cAsADbGC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/0swh6g6r5ugvptlzqeu3.png" width="600px" />
  <br>
</h2>

Types of Graphs:

- Undirected Graph
- Directed Graph
In a programming language, graphs can be represented using two forms:

- Adjacency Matrix
- Adjacency List
Common graph traversing algorithms:

- Breadth First Search
- Depth First Search

### Commonly asked Graph interview questions

- Implement Breadth and Depth First Search
- Check if a graph is a tree or not
- Count number of edges in a graph
- Find the shortest path between two vertices

## Trees

A tree is a hierarchical data structure consisting of vertices (nodes) and edges that connect them. Trees are similar to graphs, but the key point that differentiates a tree from the graph is that a cycle cannot exist in a tree.

Trees are extensively used in Artificial Intelligence and complex algorithms to provide an efficient storage mechanism for problem-solving.

Here's an image of a simple tree, and basic terminologies used in tree data structure:

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Y-AMvRwX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/h2ohetg2bqhiyiedrr78.png" width="600px" />
  <br>
</h2>

The following are the types of trees:

- N-ary Tree
- Balanced Tree
- Binary Tree
- Binary Search Tree
- AVL Tree
- Red Black Tree
- 2–3 Tree

Out of the above, Binary Tree and Binary Search Tree are the most commonly used trees.

### Commonly asked Tree interview questions
- Find the height of a binary tree
- Find kth maximum value in a binary search tree
- Find nodes at "k" distance from the root
- Find ancestors of a given node in a binary tree

## Trie

Trie which is also known as "Prefix Trees", is a tree-like data structure which proves to be quite efficient for solving problems related to strings. It provides fast retrieval, and mostly used for searching words in a dictionary, providing auto suggestions in a search engine, and even for IP routing.

Here's an illustration of how three words "top", "thus" and "their" are stored in Trie:

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--XHQo-v78--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/nj3ymtbis2f9zfz9xmzm.png" width="600px" />
  <br>
</h2>

The words are stored in the top to the bottom manner where green colored nodes "p", "s" and "r" indicates the end of "top", "thus" and "their" respectively.

### Commonly asked Trie interview questions:

- Count total number of words in Trie
- Print all words stored in Trie
- Sort elements of an array using Trie
- Form words from a dictionary using Trie
- Build a T9 dictionary

## Hash Table

Hashing is a process used to uniquely identify objects and store each object at some pre-calculated unique index called its "key." So, the object is stored in the form of a "key-value" pair, and the collection of such items is called a "dictionary." Each object can be searched using that key. There are different data structures based on hashing, but the most commonly used data structure is the hash table.

Hash tables are generally implemented using arrays.

The performance of hashing data structure depends upon these three factors:

- Hash Function
- Size of the Hash Table
- Collision Handling Method

Here's an illustration of how the hash is mapped in an array. The index of this array is calculated through a Hash Function.

<h2 align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--wHLNazUq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/j62lo4fi45nl17oi20te.png" width="600px" />
  <br>
</h2>

### Commonly asked Hashing interview questions

- Find symmetric pairs in an array
- Trace complete path of a journey
- Find if an array is a subset of another array
- Check if given arrays are disjoint

---

# Big O Notation

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

## Resources:

[Source I](https://dev.to/adafia/big-o-notation-3oi6#obj-2) - [Source II](https://dev.to/sofiajonsson/basics-big-o-notation-a6m) - [Source III](https://dev.to/fahimulhaq/top-8-data-structures-for-coding-interviews-and-practice-interview-questions-2pb)