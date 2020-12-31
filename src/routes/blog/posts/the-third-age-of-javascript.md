---
title: The Third Age of JavaScript
date: "2021-01-06T08:38:00.000Z"
---

A bunch of things are moving in JavaScript - it is quite feasible that the JS of 10 years from now will look totally unrecognizable

<!-- more -->

Every 10 years there is a changing of the guard in JavaScript. I think we have just started a period of accelerated change that could in future be regarded as the Third Age of JavaScript.

<h2 align="center">
  <img src="https://dev-to-uploads.s3.amazonaws.com/i/rlixanixq8pyrpg9ivrv.png" width="600px" />
  <br>
</h2>

## The Story So Far

The first age of JS, from 1997-2007, started with a bang and ended with a whimper. You all know Brendan Eich's story, and perhaps it is less known how the ES4 effort faltered amidst strong competition from closed ecosystems like Flash/ActionScript. The full origin story of JS is better told by its principal authors, Brendan Eich and Allen Wirfs-Brock, in JavaScript: The First 20 Years.

<h2 align="center">
  <img src="https://basbossink.github.io/presentations/modern-javascript/images/ecmascript-history.png" width="600px" />
  <br>
</h2>

The second age of JS, from 2009-2019, started with the annus mirabilis of 2009, where npm, Node.js, and ES5 were born. With Doug Crockford showing us its good parts, users built a whole host of JS Build Tools and libraries, and extended JS' reach to both desktop and new fangled smart phones. Towards 2019 we even saw the emergence of specialized runtimes for JS on phones like Facebook's Hermes as well as compiler first frontend frameworks like Svelte 3.

## The Third Age

2020 feels like the start of a new Age. If the First Age was about building out a language, and the Second Age was about users exploring and expanding the language, the Third Age is about clearing away legacy assumptions and collapsing layers of tooling.

> Note: I have pitched the Collapsing Layers thesis before!

The main legacy assumption being cleared away is the JS ecosystem's reliance on CommonJS, which evolved as a series of compromises. Its replacement, ES Modules, has been waiting in the wings for a while, but lacked the momentum to truly take a leap because existing tooling was slow but "good enough". On the frontend, modern browsers are equipped to handle these in small amounts too, but important details haven't yet been resolved. The Pika/Snowpack project is positioned to accelerate this future by providing a facade that can disappear as ES Modules get worked out. As a final bonus, IE11 will begin its slow march to end of life starting this year and ending in 2029.

The other assumption going away is that JavaScript tools must be built in JavaScript. The potential for type safety and 10x-100x performance speedup in hot paths is too great to ignore. The "for JS in JS" ideal was chipped away with the near complete takeover of JavaScript by TypeScript and now Deno and Relay are proving that people will learn Rust to contribute to core JS tools. Brandon Dail predicts this conversion will be done by 2023. We will continue to write JavaScript and TypeScript for the majority of surrounding tooling where approachability outweighs performance. Where we used to think about "Functional Core, Imperative Shell", we are now moving to "Systems Core, Scripting Shell".

> Note - this is contested, and Python's PyPy indicates this isn't a foregone conclusion.

Layers are also collapsing in interesting ways. Deno takes a radical approach of writing a whole new runtime, collapsing a bunch of common tools doing tasks like testing, formatting, linting and bundling into one binary, speaking TypeScript, and even including a standard lib. Rome takes a different tack, collapsing all those layers atop of Node.js (as far as I know, I'm not too close to it).

Something that didn't exist 10 years ago and now is a fact of life is public clouds (AWS, Azure, GCP, et al). JavaScript has an interesting relationship with the cloud that I cannot quite articulate - Cloud platform devs wouldn't touch JS with a 10 foot pole, but yet JS is their biggest consumer. AWS Lambda launched with JS first. There's also a clear move to collapse layers between your IDE and your cloud and remove the pesky laptop in between. Glitch, Repl.it, Codesandbox, GitHub Codespaces, Stackblitz and more are all Cloud Distros leveraging JS to explore this space. Meanwhile, JAMstack providers like Netlify and Vercel tackle it from the PoV of collapsing layers between your CI/CD and your CDN, and removing the pesky running server in between.

Even in frontend frameworks, the activity going on is fascinating. Svelte collapsed everything from animations to state management into a compiler. React is exploring metaframeworks and client-server integration. And Vue is working on an "unbundler" dev server project named Vite.

In summary: Third Age JS tools will be

- Faster
- ESM first
- Collapsed Layers (One thing doing many things well instead of many things doing one thing well)
- Typesafe-er (built with a strongly typed language at core, and supporting TS in user code with zero config)
- Secure-er (from dependency attacks, or lax permissions)
- Polyglot
- Neo-Isomorphic (recognizing that much, if not most, JS should run first at buildtime or on server-side before ever reaching the client)

The result of all of this work is both a better developer experience (faster builds, industry standard tooling) and user experience (smaller bundles, faster feature delivery). It is the final metamorphosis of JavaScript from site scripting toy language to full application platform.

## The Death of JavaScript?

If Gary Bernhardt's predictions hold true, the Third Age may be JavaScript's last (his timeline gives JS until 2035). There is always the looming specter of Web Assembly - even Brendan Eich has pivoted his famous saying to "Always Bet on JS - and WASM". He originally thought JS could be "the universal virtual machine", but told me once that WASM now is the ultimate fulfillment of that idea.

If so - we're in the Endgame now.

[Source](https://www.swyx.io/js-third-age/)