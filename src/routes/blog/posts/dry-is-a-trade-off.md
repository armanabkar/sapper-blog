---
title: DRY is a Trade-Off
date: "2021-02-05T08:38:00.000Z"
---

DRY, or Don't Repeat Yourself is frequently touted as a principle of software development ...

<!-- more -->

DRY, or [Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) is frequently touted as a principle of software development. "Copy-pasta" is the derisive term applied to a violation of it, tying together the concept of copying code and pasta as description of software development bad practices (see also [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code)).

It is so uniformly reviled that some people call DRY a "principle" that you should never violate. Indeed, some linters even detect copy-paste so that it can never sneak into the code. But copy-paste is not a comic-book villain, and DRY does not come bedecked in primary colors to defeat it.

It is worthwhile to know why DRY started out as a principle. In particular, some for some modern software development practices, violating DRY is the right thing to do.

The main problem with repeating a code chunk is that if a bug is found, there is more than one place where it needs to be fixed. On the surface of it, this seems like a reasonable criticism. All code has bugs, those bugs will be fixed, why not minimize the cost of fixing them?

As with all engineering decisions, following DRY is a trade-off. DRY leads to the following issues:

- Loss of locality
- Overgeneralized code
- Coordination issues
- Ownership issues

## Loss of locality

The alternative to copy-pasting the code is usually to put it in a function (or procedure, or a subroutine, depending on the language), and call it. This means that when reading through the original caller, it is less clear what the code does.

When you are debugging, this means we need to "Step into" the function. While stepping into, it is non-trivial to check the original variables. If you are doing "print debugging", this means finding the original source for the function and adding relevant print statements there.

Especially when DRY is pointed out and reactions are instinctive, the function might have some surprising semantics. For example, mutating contents of local variables is sensible in code. When you move this code to a function as a part of a straightforward DRY refactoring, this means that now a function is mutating its parameters.

## Overgeneralized code

Even if the code initially was the same in both places, there is no a-priori guarantee that it will stay this way. For example, one of those places might be called frequently, and so would like to avoid logging too many details. The other place is called seldom, and those details are essential to trouble-shooting frequent problems.

The function that was refactored now has to support an extra parameter: whether to log those details or not. (This parameter might be a boolean, a logging level, or even a logging "object" that has correct levels set up.)

Since usually there is no institutional memory to undo the DRY refactoring, the function might add more and more cases, eventually almost being two functions in one. If the "copy-pasta" was more extensive, it might lead to extensive over-generalization: each place needs a slightly different variation of the functionality.

## Coordination issues

Each modification of the "common" function now requires testing all of its callers. In some situations, this can be subtly non-trivial.

For example, if the repetition was across different repositories, now updates means updating library versions. The person making the change might not even be aware of all the callers. The callers only find out when a new library version is used in their code.

## Ownership issues

When each of those code segments were repeated, ownership and responsibility were trivial. Whoever owned the surrounding code also owned the repeated segment.

Now that the code has been moved elsewhere, to a "shared" location, ownership can often be muddled. When a bug is found, who is supposed to fix it? What happens if that "bug" is already relied on by another use?

Especially in case with reactive DRY refactoring, there is little effort given to specifying the expected semantics of the common code. There might be some tests, but the behavior that is not captured by tests might still vary.

## Summary

Having a common library which different code bases can be relied on is good. However, adding functions to such a library or libraries should be done mindfully. A reviewer comment about "this code duplicates the functionality already implemented here" or, even worse, something like pylint code duplication detector, does not have that context or mindfulness.

It is better to acknowledge the duplication, perhaps track it via a ticket, and let the actual "DRY" application take place later. This allows gathering more examples, thinking carefully about API design, and make sure that ownership and backwards compatibility issues have been thought of.

Deduplicating code by putting common lines into functions, without careful thought about abstractions, is never a good idea. Understanding how to abstract correctly is essentially API design. API design is subtle, and difficult to do well. There are no easy short-cuts, and developing expertise in it takes a long time.

Because API design is such a complex skill, it is not easy to give general guidelines except one: wait. Rushing into an API design does not make a good API, even if the person rushing is an expert.

[Source](https://orbifold.xyz/dry-trade-off.html)