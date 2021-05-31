---
title: Delegation in Swift
date: "2021-06-14T08:38:00.000Z"
---

The delegate pattern has long been very prominent on Apple's platforms ...

<!-- more -->

<h2 align="center">
  <img src="https://cdn-media-1.freecodecamp.org/images/1*S4__g3knEbuuE6qHyWIbNQ.png" width="600px" />
  <br>
</h2>

The delegate pattern has long been very prominent on Apple's platforms. Delegation is used for everything from handling table view events using ```UITableViewDelegate```, to modifying cache behavior using ```NSCacheDelegate```. The core purpose of the delegate pattern is to allow an object to communicate back to its owner in a decoupled way. By not requiring an object to know the concrete type of its owner, we can write code that is much easier to reuse and maintain.

Just like the observer pattern, which we took a look at in the past two posts, the delegate pattern can be implemented in many different ways. This week, let's take a look at a few of those ways, along with their pros and cons.

## When to delegate

The main benefit of delegating certain decisions and behaviors to a type's owner is that it becomes much easier to support multiple use cases without having to create massive types that themselves need to account for all those use cases.

Take ```UITableView``` or ```UICollectionView``` for example. Both are extremely versatile in terms of how and what they render. Using delegation we are easily able to handle events, decide how cells should be created and adjust layout attributes - all without either class having to know anything about our specific logic.

Delegation is usually a good choice when a type needs to be usable in many different contexts, and when it has a clear owner in all of those contexts - just like how a ```UITableView``` is often owned by either a parent container view or its view controller. In contrast to an observable type, a type using delegation communicates only with a single owner - establishing a 1:1 relationship between them.

## Protocols

The most common way of delegation that's found in Apple's own APIs is by using delegate protocols. Just like how ```UITableView``` has a ```UITableViewDelegate``` protocol, we can also setup our own types in a similar fashion - like how we here define a ```FileImporterDelegate``` protocol for a ```FileImporter``` class:

```swift
protocol FileImporterDelegate: AnyObject {
    func fileImporter(_ importer: FileImporter,
                      shouldImportFile file: File) -> Bool

    func fileImporter(_ importer: FileImporter,
                      didAbortWithError error: Error)

    func fileImporterDidFinish(_ importer: FileImporter)
}

class FileImporter {
    weak var delegate: FileImporterDelegate?
}
```

When implementing our own delegate protocols, it's usually a good idea to try to follow the naming conventions that have been established through Apple's own use of this pattern. Some quick guidelines that are good to keep in mind:

- To make it clear that a method is indeed a delegate method, it's common practice to start the method name with the name of the type that is delegating - like how every method above starts with ```fileImporter```.
- A delegate method's first argument should ideally be the delegating object itself. That makes it easy for an object that owns multiple instances to distinguish between them when handling events.
- When delegating, it's important to not leak any implementation details to the delegate. For example, when handling a button tap, it might seem useful to pass the button itself to the delegate method - but if that button is a private subview it doesn't really belong in the public API.

The advantage of taking the protocol-based route is that it's an established pattern that most Swift developers are familiar with. It also groups all events that a type (```FileImporter``` in this case) can emit into one single protocol, and the compiler will give us errors in case something isn't correctly implemented.

However, this approach also has some downsides. The most obvious one in our ```FileImporter``` example above, is that using delegate protocols can be a source of ambiguous state. Note how we are delegating the decision whether to import a given file to the delegate - but since assigning a delegate is optional, it can become a bit tricky to decide what to do if a delegate is absent:

```swift
class FileImporter {
    weak var delegate: FileImporterDelegate?

    private func processFileIfNeeded(_ file: File) {
        guard let delegate = delegate else {
            // Uhm.... what to do here?
            return
        }

        let shouldImport = delegate.fileImporter(self, shouldImportFile: file)

        guard shouldImport else {
            return
        }

        process(file)
    }
}
```

The above problem can be handled in many ways - including adding an ```assertionFailure()``` in the ```else``` clause when unwrapping the delegate, or using a default value. But either way it shows that we have somewhat of a weakness in our setup, since we are introducing another classic "this should never happen" scenario, which should ideally be avoided.

## Closures

One way that we can make the above code a bit more predictable is to refactor the decision-making part of our delegate protocol to use a closure instead. That way, our API user will be required to specify the logic used to decide which files that will be imported up-front, removing the ambiguity in our file importer's logic:

```swift
class FileImporter {
    weak var delegate: FileImporterDelegate?
    private let predicate: (File) -> Bool

    init(predicate: @escaping (File) -> Bool) {
        self.predicate = predicate
    }

    private func processFileIfNeeded(_ file: File) {
        let shouldImport = predicate(file)

        guard shouldImport else {
            return
        }

        process(file)
    }
}
```

With the above change in place, we can now go ahead and remove the ```shouldImportFile``` method from our delegate protocol, leaving us with only methods related to changes in state:

```swift
protocol FileImporterDelegate: AnyObject {
    func fileImporter(_ importer: FileImporter,
                      didAbortWithError error: Error)

    func fileImporterDidFinish(_ importer: FileImporter)
}
```

The main advantage of the above is that it now becomes much harder to use our ```FileImporter``` class "the wrong way", since it's now completely valid to use it without even assigning a delegate (which in this case might be useful in case some files should be imported in the background and we're not really interested in the outcome of the operation).

## Configuration types

Let's say we wanted to continue converting the rest of our delegate methods into closures as well. One way of doing so would be to simply continue adding closures as either initializer arguments or mutable properties. However, when doing so, our API can start becoming a bit messy - and it can be hard to distinguish between configuration options and other types of properties.

One way of solving that dilemma is to use a dedicated configuration type. By doing so we can achieve the same nice grouping of events, just like we had with our original delegate protocol, while still enabling a lot of freedom when implementing the various events. We'll use a ```struct``` for our configuration type and add properties for each event, like this:

```swift
struct FileImporterConfiguration {
    var predicate: (File) -> Bool
    var errorHandler: (Error) -> Void
    var completionHandler: () -> Void
}
```

We can now update ```FileImporter``` to take a single parameter - its ```configuration``` - when being initialized, and easily access each closure by saving the configuration in a property:

```swift
class FileImporter {
    private let configuration: FileImporterConfiguration

    init(configuration: FileImporterConfiguration) {
        self.configuration = configuration
    }

    private func processFileIfNeeded(_ file: File) {
        let shouldImport = configuration.predicate(file)

        guard shouldImport else {
            return
        }

        process(file)
    }

    private func handle(_ error: Error) {
        configuration.errorHandler(error)
    }

    private func importDidFinish() {
        configuration.completionHandler()
    }
}
```

Using the above approach to delegation also comes with a nice bonus benefit - it becomes super easy to define convenience APIs for various common ```FileImporter``` configurations. For example, we can add a convenience initializer on ```FileImportConfiguration``` that only takes a predicate - making it simple to create a "fire and forget" type importer:

```swift
extension FileImporterConfiguration {
    init(predicate: @escaping (File) -> Bool) {
        self.predicate = predicate
        errorHandler = { _ in }
        completionHandler = {}
    }
}
```

> As a quick side note; by defining struct convenience initializers in extensions instead of on the type itself, we can still keep the default compiler-generated initializer.

We can even create static convenience APIs for common configurations that doesn't require any parameters, for example a variant that simply imports all files:

```swift
extension FileImporterConfiguration {
    static var importAll: FileImporterConfiguration {
        return .init { _ in true }
    }
}
```

Which we can then use using Swift's really elegant dot syntax, making for an incredibly easy to use API, that still offers a lot of customization and flexibility:

```swift
let importer = FileImporter(configuration: .importAll)
```

Pretty sweet! 😀

## Conclusion

The delegate pattern continues to be an important part of both Apple's frameworks and our own codebases. But even though it's an old and quite simple concept, it can be implemented in many different ways - each with their own pros and cons.

Using delegate protocols provide a familiar and solid pattern that is a good default for many use cases. Closures add more flexibility, but can also lead to more complicated code (not to mention accidental retain cycles if the delegating object ends up capturing its owner in one of its closures). Configuration types can provide a nice middle ground, but also require a bit more code (although, like we've seen, with the right convenience APIs in place our code can actually end up becoming a lot simpler).

What do you think? What flavor of delegation do you usually use in your code? Let me know - along with any questions, comments or feedback that you might have - on Twitter @johnsundell.

Thanks for reading! 🚀

[Source](https://www.swiftbysundell.com/articles/delegation-in-swift/)