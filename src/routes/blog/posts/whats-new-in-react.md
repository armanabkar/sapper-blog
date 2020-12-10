---
title: React 17 is released - What's New in React?
date: "2020-12-03T08:38:00.000Z"
---
React 17 was just released today and the official blog post covers it in great depth. In this post, let's discuss what major changes it brings and how they affect you as a React developer.

## No New Features

First big bummer is that there's no new feature in this React release. Because this is a Release Candidate release, it is clear that there would be no features in any 17.x release.

That means, any new feature is now going to be in React 18 and later.

## import React is not required

This is a good implementation, something which Next.js has been following for some time. Consider the following block of code:

```bash
export default function Home() {
    return <h1>Hello</h1>
}
```
If you try to use this as a component with React 16 or earlier, you'll get an error ``React not found`` even if you're not using ``React`` variable at all here. This is because, this JSX is actually compiled down to the following:
```bash
"use strict";

exports.__esModule = true;
exports.default = Home;

function Home() {
  return /*#__PURE__*/React.createElement("h1", null, "Hello");
}
```

See what happened there? Your JSX was compiled down to something which uses ``React``. And now because ``React`` was not in scope, you got an error.

This is not a problem with React 17. React 17 automatically injects ``React`` in scope. Here's how it happens if you want more details

## Event Delegation Changes

Earlier, React used to follow the following convention, take a look at the code:

```bash
<button onClick={handleClick}>Button</button>
```
When you write this React code, React actually attaches the ``click`` event listener on ``document`` object and whenever you click on the button, DOM actually calls the event listener on ``document`` and then React calls the right event handler.

With React 17, React now attaches event listener on your ``rootNode`` of the tree, i.e. the element you give in ``ReactDOM.render`` call. This image describes it better:

![React17](https://s3.amazonaws.com/codedamn-blog/2020/08/react_17_delegation.png)
Credits: React official blog

## No Event Pooling

This is personally my favourite thing with React 17. Events are no longer pooled. What does that mean? Consider the following React code:

```bash
function Home() {
    function handleChange(e) {
      setTimeout(() => {
      	console.log(e.target) // ERROR in React 16 and below
      }, 2000)
    }
    
    return <button onClick={handleChange}>Hello</button>
}
```

The above code would be problematic in React 16 and below, because the ``e`` i.e. the event object is ``pooled`` i.e. shared across different events. So it is possible that by the time ``setTimeout`` actually fires your callback function, the ``e`` object is actually used by some other event and is now not what you expect.

This is fixed in React 17 with the change that there's no event pooling now. That means your object would be unique to the event call! Nice :)

## More Changes

- Effect cleanup timing - the callback function from ``useEffect`` when the component is unmounted is now asynchronously executed, instead of synchronous execution which used to happen before.
- Better native component stacks
- Some internal private export changes in React

## Conclusion

I'm excited for React and what it brings! Suspense and concurrent mode is also around the corner. Let's see what React has to offer in React 18 and later.

[Source](https://codedamn.com/news/react-17-new-features)