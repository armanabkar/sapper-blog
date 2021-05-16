---
title: A Crash Course in Compilers
date: "2021-02-05T08:38:00.000Z"
---

Diving deeper into program language theory is a great way to grow as a developer ...

<!-- more -->

<h2 align="center">
  <img src="https://increment.com/art/5/articles/compiler-1000-f5c4c59c.jpeg" width="400px" />
  <br>
</h2>

Diving deeper into program language theory is a great way to grow as a developer. Here, we go through the essentials of using compilers in language design.

Late one night on an uncrowded subway car in New York City, I had my laptop open, working on a game whose deadline was drawing near. A gentleman sat next to me and, seeing the walls of colored text on my screen, asked if I was writing C++. I told him I wasn’t, and he was curious to hear what language I was using. I was working on a web game in a programming language I had designed for myself, and I told him so—it was something that I made up, I said. After looking at me for a moment, he asked, “Why would anyone do that?” I started to answer, but alas, we had arrived at his stop, and he disappeared onto the platform before I could explain myself. In many ways, I’ve been trying to answer that man’s question for years now.

<h2 align="center">
  <img src="https://increment.com/art/5/compiler/2-500-20a027c4.jpeg" width="400px" />
  <br>
</h2>

The thing is, I absolutely love programming languages. I work as a graphics and video game developer, which is thrilling and challenging work, but secretly I would rather be hacking on compilers. I love languages because, of everything I’ve encountered in computing, languages are by far the weirdest. They combine the brain-bending rigor of abstract math, the crushing pressures of capitalistic industry, and the irrational anxiety of a high school prom. The decision to adopt or avoid a language is always a mix of their perceived formal power (“Does this language even have this particular feature?”), employability (“Will this language get me a job?”), and popularity (“Does anyone important use this language anymore?”). I can’t think of another engineering tool that demands similar quasi-religious devotion from its users. Programming languages ask us to reshape our minds, and that makes them deeply personal and subjective.

The field of study of programming languages is called programming language theory, or PLT. Software engineers are confronted with programming languages just about every day, but few develop a deep relationship with PLT. Languages are tools, primarily, a means to an end, and most professionals will do fine just learning to use the popular ones well enough to get their jobs done.


> Guido van Rossum is the original author and Benevolent Dictator for Life of the Python programming language.

> Rich Hickey is the original author and Benevolent Dictator for Life of the Clojure programming language.

Diving deeper into PLT, though, is a great way to grow as a developer. Not only is language design a lot of fun, but a deeper understanding of the tools you use every day will give you a better handle on them, and can make learning new languages considerably easier, even if you don’t dream of becoming the next Guido van Rossum or Rich Hickey. And hey, you never know—your personal project could become the next major piece of software engineering infrastructure. It’s happened before.

## What is a programming language?

So, what is a programming language? This might seem like an odd question to ask about tools this ubiquitous, but starting from a definition is often helpful to focus the conversation. A programming language is a formal language used to communicate instructions to a computer. It is formal in that it conforms to a rigid set of rules that determine what is and is not allowed. It is a means of communication in that the primary goal of the tool is to translate ideas in a programmer’s head into a form that a computer can act on. The fact that you are communicating with a computer is significant. Unlike other forms of language, or even instructional arts like musical composition or screenwriting, the final agent fulfilling the instructions is not human. The result is that qualities that other forms of communication tend to depend on—like intuition, common sense, and context—are not available.

The decisive factor in what makes something a programming language (or not) is known as Turing completeness. Alan Turing’s seminal work in the 1940s included the definition of the Turing machine, a mathematical description of an abstract computer that became foundational for our understanding of how algorithms work. A Turing machine can, provably, implement any computable algorithm, and any system that can simulate the Turing machine can do so as well. Such a system is deemed Turing complete, and most programming languages have this status as a basic goal (though there are some interesting languages that do not). A deep dive into computability theory is beyond the scope of this article, but suffice it to say that a language with some notion of state (often variables or argument passing) and conditionals is most likely Turing complete. This leaves out markup languages like HTML and configuration languages like YAML or JSON, but includes a hilarious collection of systems that are accidentally Turing complete (including an abuse of HTML and CSS).

In practice, you interact with programming languages via computer programs or software libraries into which you feed code in order to produce an effect. They come in two broad manifestations: as compilers and as interpreters. Each approach has its advantages and disadvantages, and the line between the two can be quite blurry, with frameworks like Mono going so far as to offer both simultaneously.

> The Make A Lisp (MAL) project is a Lisp designed to teach language design and implementation. It offers guides on how to implement the simple language in 72 programming languages.

An interpreter’s job is to take source code and immediately implement its effects. An interpreter turns source code into an internal representation that it can use to carry out the computation the source code describes. This representation will include the functions, variables, expressions, statements, and all other semantics of the source language. You can think of source code as an extreme, Turing-complete configuration file that controls the interpreter’s behavior. My first foray into language design was based on Peter Norvig’s excellent Lispy interpreter in Python, and the more recent MAL project has amassed implementations in 72 languages. The advantages of interpreters include their simplicity, the fact that they can often start executing faster than compilers, and their ability to run in environments where compiling new code is prohibited (like on iOS or most video game consoles).

This piece, however, will focus on compilers. The job of a compiler is to take source code and translate it into a target code with the same meaning. Often that target code is in a lower-level language like machine code, but that isn’t always the case. The generated target code can then be evaluated in order to carry out the computation of the original source code. Compilers can be thought of as a pipeline of transformations, starting with the programmer’s source code and proceeding through a series of internal representations that end in the desired target code, after which it is handed off to another system for evaluation.

> Bytecode resembles machine code, but it is designed to be executed by a virtual machine rather than by physical hardware. As a result, bytecode can be higher-level (i.e., it can represent constructs that hardware does not directly support) and more portable (i.e., the same bytecode can run on different machine architectures).

The classic example is a compiler for the C programming language, where source code written in C is compiled into machine code that a computer’s hardware can execute directly. In this case, a higher-level language is compiled into a lower-level one. C# and Java are similar, but they compile into bytecodes that are executed by the Common Language Runtime (CLR) and the Java virtual machine (JVM), respectively, as opposed to physical hardware. Virtual machines like the CLR and the JVM provide cross-platform environments that handle a lot of low-level details for you while providing additional functionality like garbage collection and a type system. There are even cases where it is desirable to compile a lower-level language into a higher-level one. To run in the browser, the JSIL project compiles C# bytecode into JavaScript so it can run on the web, and Emscripten does the same for C and C++. There are also situations where the same language is both the source and target language. The so-called transpilers Babel and Closure compile JavaScript into JavaScript in order to access new features of the language and implement optimizations, respectively.

## How does a compiler work?

Compilers tend to proceed in a linear sequence of phases, each phase providing the next with its input. Even wildly different languages will broadly have the same structure. Comparing the compilation steps of different languages is a useful way to get a handle on the general process, and to begin to grok how a compiler works.

### PARSING

The first question a compiler has to answer is, “What did the programmer say?” This step in the compiler pipeline is usually called parsing. The user prepares source code that is valid in the language they are programming in. Source code is often text, but it doesn’t have to be—take the visual languages Scratch, Pure Data (Pd), and Max/MSP, for example. Once the programmer has prepared their source code, the compiler’s first task is to turn it into a data structure that is useful to later stages of the compiler. This is the stage where errors specific to the syntax are reported, like missing semicolons or unmatched braces. This is done differently from language to language, but in two broad categories: Lisp reading and scanning/parsing.

> Homoiconic: The language’s syntax is constructed entirely out of data structures that the language itself can generate and manipulate directly, making code into data and vice versa.

Languages in the Lisp family are notorious for their simple syntaxes. The simplicity is a result of deliberate design, but also a side-effect of a property that Lisp programmers take very seriously: Lisp source code is a literal representation of Lisp data. Put another way, Lisp source code is homoiconic with Lisp data. To that end, the first step in a Lisp compiler is to turn source code text into data structures that the language understands. Historically this has included lists, numbers, and symbols, known collectively as “symbolic expressions” or “s-expressions,” but modern Lisps like Clojure include hashmaps, vectors, and sets in their syntax. Lisps traditionally call this step “reading” instead of parsing (which is where the R in REPL comes from, a Lisp idea). Lisp readers are simple enough that they tend to be written by hand. Clojure’s reader is handwritten in Java and contains a combination of regular expressions and string operations to convert text into data structures, even matching against string literals when it needs to.

<h2 align="center">
  <img src="https://increment.com/art/5/compiler/1-500-62ddc900.jpeg" width="400px" />
  <br>
</h2>

Languages with more complex syntax require more work. The majority of mainstream languages require a two-step process: scanning followed by parsing. A scanner (also known as a lexical analyzer) reads source text and produces a linear stream of tokens; the parser reads the stream of tokens and recognizes patterns to transform into nodes in an abstract syntax tree that the next step of the pipeline will deal with. The complexity of this step depends on the complexity of the syntax of the language. Some languages will use handwritten scanners and parsers, while others will depend on parser generators like Lex/Yacc or Flex/Bison, which take as input a specification of the desired grammar of the language, and produce as output a scanner and parser for that language.

TypeScript’s scanner is handwritten and features recognizable constructs like mapping from keywords to token types and a large statement switching on character codes to determine what to scan next. The tokens allow the parser to reason with higher-level constructs like SyntaxKind.​AsteriskToken and SyntaxKind.​OpenBraceToken as in the parse​Import​Declaration​Or​Import​Equals​Declaration function. CoffeeScript relies on Jison, a JavaScript port of Bison, for its parsing. We can see the language described as a grammar with declarative rules, like the rules for if expressions. Ruby’s Yacc grammar is a favorite of mine: In order to implement Ruby’s famously appealing syntax, the grammar comes out to a colossal 11,400+ lines of Yacc code!

### ANALYSIS

Once parsing is complete, the compiler must analyze the parsed code into an abstract syntax tree, or AST. Analysis answers the question, “What did the user mean?” Languages in the Lisp family will usually take an additional step to go from the s-expressions the reader produced to an initial AST, while the parsers of languages outside the Lisp family will usually produce an AST directly. This is where the semantic features of the language are implemented, like name resolution, control flow, and function invocation. Additionally, analysis is a phase where optimizations can begin to happen, by transforming the AST into semantically equivalent ASTs that perform better. This is likely the most varied phase between compilers, and each language will be radically different here. There aren’t really any libraries or APIs to lean on here, and it’s up to the language implementer to derive this meaning themselves.

> Reflection is the process by which a program can inspect and modify itself while running, as if it were looking in the mirror. Reflection can produce information objects and their types, along with their in-memory layout and other metadata.

In languages with types, this is where type information is inferred, flowed, and validated. Even dynamically typed languages can flow type information in order to gain performance. For example, ClojureCLR uses reflection to determine the type of its static method invocations and static field lookups. This information is used to generate better bytecode and compiler errors. Languages like TypeScript provide a type system to a target that is dynamically typed by thoroughly checking types in the analysis phase and issuing a warning if types do not line up. Type-safe languages like Haskell will dedicate a large portion of their analysis phase to type checking.

### EMISSION

Once an AST is produced and settled on, the final step is to emit the target code. When targeting machine code, modern languages will most often use the LLVM toolchain. LLVM is an exciting project because it unifies various hardware platforms and optimizations under one target. It specifies its own intermediate representation (LLVM IR) that a compiler would emit. IR code then goes through the same parse-analyze-emit pipeline described in this article to turn into machine code. The benefit is that LLVM presents a more straightforward assembly language that is still very low level without concerning the language developer with platform-specific quirks. Targeting IR means your language can take advantage of optimizations written for C and C++ with no additional effort on your part. LLVM exposes both a C++ and a C API to generate IR. The C API means bindings to other languages are possible (I’ve successfully used them in Node and C#). LLVM can even be found in compilers for dynamic languages like Julia.

Virtual machine targets like the CLR and the JVM are similar, but each exposes a bytecode language that is at an even higher level than LLVM IR. C#’s standard library provides a very robust namespace specifically for generating bytecode that exposes an object-oriented interface to emit assemblies, types, methods, and every other aspect of bytecode. Java does not have a comparable namespace in its own standard library, but third-party libraries like ASM or BCEL can fill this gap. These APIs can be seen in somewhat wrapped form in Clojure’s JVM and CLR compilers.

If the target is source code in a high-level language, emission might actually involve concatenating strings together. There often isn’t an existing API to generate source code in a high-level programming language—the expectation is that a human programmer will manually type it all out. This is an issue for languages that compile to JavaScript, as is evident in the ClojureScript and TypeScript compilers. Some languages, like Carp, treat C as their compile target, resulting in similar-looking emission phases.

### TOOLING AND ECOSYSTEMS

At this point, formally speaking, you’re done! The compiler has transformed code from the source language into the target language and achieved its basic goal. In practice, however, the job of a language designer is just beginning. Languages are more than their compilers, and the day-to-day experience of working with a language actually involves myriad developer tools acting in concert. Once a language’s compiler is working, the question then becomes one of editor integration, debugger support, documentation, a community, and a library ecosystem. Most of this takes considerable time to develop, and this is what gives existing languages inertia over new ones.

<h2 align="center">
  <img src="https://increment.com/art/5/compiler/3-500-a3037485.jpeg" width="400px" />
  <br>
</h2>

Historically, languages had not directly addressed the task of managing third-party libraries, or packages. In the pre-web, pre-open source days, when languages like C++ arrived, the issue of integrating with a stranger’s code was nowhere near as complicated as it is now. Even languages that appeared in the 1990s tended to not include package managers, with Ruby’s RubyGems not landing until eight years after Ruby itself. Post-web languages are more likely to include a package manager as part of their standard tooling, as Elm and Rust do. Most package managers are specific to their languages, custom built, and require server infrastructure, though generic solutions like Gx and Nix are available as well. Gx is interesting because it operates over IPFS, a peer-to-peer protocol that requires no central server coordination. Nix is the result of Eelco Dolstra’s PhD thesis, “The Purely Functional Software Deployment Model,” and is primarily used in the NixOS operating system. It’s purely functional and, as a result, provides very reproducible deployments.

Integrating with editors has also been a pain, traditionally. Programmers expect good syntax highlighting, completion, and other features all in their favorite editor. It was usually up to the community to provide these bindings, leading to an uneven developer experience across editors. Recently, Microsoft has put out what they call the Language Server Protocol to help address these issues and make it easier to integrate new programming languages with text editors. It’s essentially a network protocol for a text editor. Your language only needs to implement the protocol once, and then every editor that supports it (which is most major editors) can communicate with your language to get autocomplete and other features.

## Why anyone would do this

If you’re reading this, gentleman from the subway, I hope it has begun to answer your question about why anyone would make up a programming language. It’s a wonderful puzzle to solve, and more approachable than it may seem at first. Languages represent different ideas of how to capture human creativity on a machine, and I’ve never been disappointed by pulling the curtain back on an implementation to see how it ticks. Seeing common patterns across different languages and getting a sense of their trade-offs also gives you a new perspective when picking up new languages, something every working programmer will have to do at some point in their career.

Whether you’re building the next chapter in the history of software engineering or just peeking under the hood of a machine that you use every day, the world of programming languages is yours to explore. It will expand your mind and make you a better programmer—and you might not even be the strangest person on the train.

[Source](https://increment.com/programming-languages/crash-course-in-compilers/)