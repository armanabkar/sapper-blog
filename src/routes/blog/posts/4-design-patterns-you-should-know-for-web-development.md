---
title: 4 Design Patterns You Should Know for Web Development
date: "2021-01-05T08:38:00.000Z"
---

Observer, Singleton, Strategy, and Decorator

<!-- more -->

<h2 align="center">
  <img src="https://www.freecodecamp.org/news/content/images/size/w2000/2020/05/design-patterns.jpg" width="600px" />
  <br>
</h2>

Have you ever been on a team where you need to start a project from scratch? That's usually the case in many start-ups and other small companies.

There are so many different programming languages, architectures, and other concerns that it can be difficult to figure out where to start. That's where design patterns come in.

A design pattern is like a template for your project. It uses certain conventions and you can expect a specific kind of behavior from it. These patterns were made up of many developers' experiences so they are really like different sets of best practices.

And you and your team get to decide which set of best practices is the most useful for your project. Based on the design pattern you choose, you all will start to have expectations for what the code should be doing and what vocabulary you all will be using.

Programming design patterns can be used across all programming languages and can be used to fit any project because they only give you a general outline of a solution.

There are 23 official patterns from the book Design Patterns - Elements of Reusable Object-Oriented Software, which is considered one of the most influential books on object-oriented theory and software development.

In this article, I'm going to cover four of those design patterns just to give you some insight to what a few of the patterns are and when you would use them.

## The Singleton Design Pattern

The singleton pattern only allows a class or object to have a single instance and it uses a global variable to store that instance. You can use lazy loading to make sure that there is only one instance of the class because it will only create the class when you need it.

That prevents multiple instances from being active at the same time which could cause weird bugs. Most of the time this gets implemented in the constructor. The goal of the singleton pattern is typically to regulate the global state of an application.

An example of a singleton that you probably use all the time is your logger.

If you work with some of the front-end frameworks like React or Angular, you know all about how tricky it can be to handle logs coming from multiple components. This is a great example of singletons in action because you never want more than one instance of a logger object, especially if you're using some kind of error tracking tool.

```javascript
class FoodLogger {
  constructor() {
    this.foodLog = []
  }
    
  log(order) {
    this.foodLog.push(order.foodItem)
    // do fancy code to send this log somewhere
  }
}

// this is the singleton
class FoodLoggerSingleton {
  constructor() {
    if (!FoodLoggerSingleton.instance) {
      FoodLoggerSingleton.instance = new FoodLogger()
    }
  }
  
  getFoodLoggerInstance() {
    return FoodLoggerSingleton.instance
  }
}

module.exports = FoodLoggerSingleton

// An example of the singleton class
```

Now you don't have to worry about losing logs from multiple instances because you only have one in your project. So when you want to log the food that has been ordered, you can use the same FoodLogger instance across multiple files or components.

```javascript
const FoodLogger = require('./FoodLogger')

const foodLogger = new FoodLogger().getFoodLoggerInstance()

class Customer {
  constructor(order) {
    this.price = order.price
    this.food = order.foodItem
    foodLogger.log(order)
  }
  
  // other cool stuff happening for the customer
}

module.exports = Customer
```
An example of a Customer class using the singleton
const FoodLogger = require('./FoodLogger')

```javascript
const foodLogger = new FoodLogger().getFoodLoggerInstance()

class Restaurant {
  constructor(inventory) {
    this.quantity = inventory.count
    this.food = inventory.foodItem
    foodLogger.log(inventory)
  }
  
  // other cool stuff happening at the restaurant
}

module.exports = Restaurant

// An example of the Restaurant class using the same singleton as the Customer class
```

With this singleton pattern in place, you don't have to worry about just getting the logs from the main application file. You can get them from anywhere in your code base and they will all go to the exact same instance of the logger, which means none of your logs should get lost due to new instances.

## The Strategy Design Pattern

The strategy is pattern is like an advanced version of an if else statement.  It's basically where you make an interface for a method you have in your base class. This interface is then used to find the right implementation of that method that should be used in a derived class. The implementation, in this case, will be decided at runtime based on the client.

This pattern is incredibly useful in situations where you have required and optional methods for a class. Some instances of that class won't need the optional methods, and that causes a problem for inheritance solutions. You could use interfaces for the optional methods, but then you would have to write the implementation every time you used that class since there would be no default implementation.

That's where the strategy pattern saves us. Instead of the client looking for an implementation, it delegates to a strategy interface and the strategy finds the right implementation. One common use for this is with payment processing systems.

You could have a shopping cart that only lets customers check out with their credit cards, but you will lose customers that want to use other payment methods.

The strategy design pattern lets us decouple the payment methods from the checkout process which means we can add or update strategies without changing any code in the shopping cart or checkout process.

Here's an example of a strategy pattern implementation using the payment method example.

```javascript
class PaymentMethodStrategy {

  const customerInfoType = {
    country: string
    emailAddress: string
    name: string
    accountNumber?: number
    address?: string
    cardNumber?: number
    city?: string
    routingNumber?: number
    state?: string
  }
  
  static BankAccount(customerInfo: customerInfoType) {
    const { name, accountNumber, routingNumber } = customerInfo
    // do stuff to get payment
  }
  
  static BitCoin(customerInfo: customerInfoType) {
    const { emailAddress, accountNumber } = customerInfo
    // do stuff to get payment
  }
  
  static CreditCard(customerInfo: customerInfoType) {
    const { name, cardNumber, emailAddress } = customerInfo
    // do stuff to get payment
  }
  
  static MailIn(customerInfo: customerInfoType) {
    const { name, address, city, state, country } = customerInfo
    // do stuff to get payment
  }
  
  static PayPal(customerInfo: customerInfoType) {
    const { emailAddress } = customerInfo
    // do stuff to get payment
  }
}
An example of the strategy pattern implementation
```

To implement our payment method strategy, we made a single class with multiple static methods. Each method takes the same parameter, customerInfo, and that parameter has a defined type of customerInfoType. (Hey all you TypeScript devs! ??) Take note that each method has its own implementation and uses different values from the customerInfo.

With the strategy pattern, you can also dynamically change the strategy being used at run time. That means you'll be able to change the strategy, or method implementation, being used based on user input or the environment the app is running in.

You can also set a default implementation in a simple config.json file like this:

```bash
{
  "paymentMethod": {
    "strategy": "PayPal"
  }
}

# config.json for setting the default implementation of paymentMethod to "PayPal" at run time
```

Whenever a customer starts going through the checkout process on your website, the default payment method they encounter will be the PayPal implementation which comes from the config.json. This could easily be updated if the customer selects a different payment method.

Now we'll create a file for our checkout process.

```javascript
const PaymentMethodStrategy = require('./PaymentMethodStrategy')
const config = require('./config')

class Checkout {
  constructor(strategy='CreditCard') {
    this.strategy = PaymentMethodStrategy[strategy]
  }
  
  // do some fancy code here and get user input and payment method
  
  changeStrategy(newStrategy) {
    this.strategy = PaymentMethodStrategy[newStrategy]
  }
  
  const userInput = {
    name: 'Malcolm',
    cardNumber: 3910000034581941,
    emailAddress: 'mac@gmailer.com',
    country: 'US'
  }
  
  const selectedStrategy = 'Bitcoin'
  
  changeStrategy(selectedStrategy)
  
  postPayment(userInput) {
    this.strategy(userInput)
  }
}

module.exports = new Checkout(config.paymentMethod.strategy)
```

This Checkout class is where the strategy pattern gets to show off. We import a couple of files so we have the payment method strategies available and the default strategy from the config.

Then we create the class with the constructor and a fallback value for the default strategy in case there hasn't been one set in the config. Next we assign the strategy value to a local state variable.

An important method we need to implement in our Checkout class is the ability to change the payment strategy. A customer might change the payment method they want to use and you'll need to be able to handle that. That's what the changeStrategy method is for.

After you've done some fancy coding and gotten all of the inputs from a customer, then you can update the payment strategy immediately based on their input and it dynamically sets the strategy before the payment is sent for processing.

At some point you might need to add more payment methods to your shopping cart and all you'll have to do is add it to the PaymentMethodStrategy class. It'll instantly be available anywhere that class is used.

The strategy design pattern is a powerful one when you are dealing with methods that have multiple implementations. It might feel like you're using an interface, but you don't have to write an implementation for the method every time you call it in a different class. It gives you more flexibility than interfaces.

## The Observer Design Pattern

If you've ever used the MVC pattern, you've already used the observer design pattern. The Model part is like a subject and the View part is like an observer of that subject. Your subject holds all of the data and the state of that data. Then you have observers, like different components, that will get that data from the subject when the data has been updated.

The goal of the observer design pattern is to create this one-to-many relationship between the subject and all of the observers waiting for data so they can be updated. So anytime the state of the subject changes, all of the observers will be notified and updated instantly.

Some examples of when you would use this pattern include: sending user notifications, updating, filters, and handling subscribers.

Say you have a single page application that has three feature dropdown lists that are dependent on the selection of a category from a higher level dropdown. This is common on many shopping sites, like Home Depot. You have a bunch of filters on the page that are dependent on the value of a top-level filter.

The code for the top-level dropdown might look something like this:

```javascript
class CategoryDropdown {
  constructor() {
    this.categories = ['appliances', 'doors', 'tools']
    this.subscriber = []
  }
  
  // pretend there's some fancy code here
  
  subscribe(observer) {
    this.subscriber.push(observer)
  }
  
  onChange(selectedCategory) {
    this.subscriber.forEach(observer => observer.update(selectedCategory))
  }
}

// The subject that updates the observers
```

This CategoryDropdown file is a simple class with a constructor that initializes the category options we have available for in the dropdown. This is the file you would handle retrieving a list from the back-end or any kind of sorting you want to do before the user sees the options.

The subscribe method is how each filter created with this class will receive updates about the state of the observer.

The onChange method is how we send out notification to all of the subscribers that a state change has happened in the observer they're watching. We just loop through all of the subscribers and call their update method with the selectedCategory.

The code for the other filters might look something like this:

```javascript
class FilterDropdown {
  constructor(filterType) {
    this.filterType = filterType
    this.items = []
  }
  
  // more fancy code here; maybe make that API call to get items list based on filterType
  
  update(category) {
    fetch('https://example.com')
      .then(res => this.items(res))
  }
}

// A potential observer of the subject
```

This FilterDropdown file is another simple class that represents all of the potential dropdowns we might use on a page. When a new instance of this class is created, it needs to be passed a filterType. This could be used to make specific API calls to get the list of items.

The update method is an implementation of what you can do with the new category once it has been sent from the observer.

Now we'll take a look at what it means to use these files with the observer pattern:

```javascript
const CategoryDropdown = require('./CategoryDropdown')
const FilterDropdown = require('./FilterDropdown')

const categoryDropdown = new CategoryDropdown() 

const colorsDropdown = new FilterDropdown('colors')
const priceDropdown = new FilterDropdown('price')
const brandDropdown = new FilterDropdown('brand')

categoryDropdown.subscribe(colorsDropdown)
categoryDropdown.subscribe(priceDropdown)
categoryDropdown.subscribe(brandDropdown)

// An example of the observer pattern in action
```

What this file shows us is that we have 3 drop-downs that are subscribers to the category drop-down observable. Then we subscribe each of those drop-downs to the observer. Whenever the category of the observer is updated, it will send out the value to every subscriber which will update the individual drop-down lists instantly.

## The Decorator Design Pattern

Using the decorator design pattern is fairly simple. You can have a base class with methods and properties that are present when you make a new object with the class. Now say you have some instances of the class that need methods or properties that didn't come from the base class.

You can add those extra methods and properties to the base class, but that could mess up your other instances. You could even make sub-classes to hold specific methods and properties you need that you can't put in your base class.

Either of those approaches will solve your problem, but they are clunky and inefficient. That's where the decorator pattern steps in. Instead of making your code base ugly just to add a few things to an object instance, you can tack on those specific things directly to the instance.

So if you need to add a new property that holds the price for an object, you can use the decorator pattern to add it directly to that particular object instance and it won't affect any other instances of that class object.

Have you ever ordered food online? Then you've probably encountered the decorator pattern. If you're getting a sandwich and you want to add special toppings, the website isn't adding those toppings to every instance of sandwich current users are trying to order.

Here's an example of a customer class:

```javascript
class Customer {
  constructor(balance=20) {
    this.balance = balance
    this.foodItems = []
  }
  
  buy(food) {
    if (food.price) < this.balance {
      console.log('you should get it')
      this.balance -= food.price
      this.foodItems.push(food)
    }
    else {
      console.log('maybe you should get something else')
    }
  }
}

module.exports = Customer

// An example of a customer class
```

And here's an example of a sandwich class:

```javascript
class Sandwich {
  constructor(type, price) {
    this.type = type
    this.price = price
  }
  
  order() {
    console.log(`You ordered a ${this.type} sandwich for $ ${this.price}.`)
  }
}

class DeluxeSandwich {
  constructor(baseSandwich) {
    this.type = `Deluxe ${baseSandwich.type}`
    this.price = baseSandwich.price + 1.75
  }
}

class ExquisiteSandwich {
  constructor(baseSandwich) {
    this.type = `Exquisite ${baseSandwich.type}`
    this.price = baseSandwich.price + 10.75
  }
  
  order() {
    console.log(`You ordered an ${this.type} sandwich. It's got everything you need to be happy for days.`)
  }
}

module.exports = { Sandwich, DeluxeSandwich, ExquisiteSandwich }


// An example of a sandwich class
```

This sandwich class is where the decorator pattern is used. We have a Sandwich base class that sets the rules for what happens when a regular sandwich is ordered. Customers might want to upgrade sandwiches and that just means an ingredient and price change.

You just wanted to add the functionality to increase the price and update the type of sandwich for the DeluxeSandwich without changing how it's ordered. Although you might need a different order method for an ExquisiteSandwich because there is a drastic change in the quality of ingredients.

The decorator pattern lets you dynamically change the base class without affecting it or any other classes. You don't have to worry about implementing functions you don't know, like with interfaces, and you don't have to include properties you won't use in every class.

Now if we'll go over an example where this class is instantiated as if a customer was placing a sandwich order.

```javascript
const { Sandwich, DeluxeSandwich, ExquisiteSandwich } = require('./Sandwich')
const Customer = require('./Customer')

const cust1 = new Customer(57)

const turkeySandwich = new Sandwich('Turkey', 6.49)
const bltSandwich = new Sandwich('BLT', 7.55)

const deluxeBltSandwich = new DeluxeSandwich(bltSandwich)
const exquisiteTurkeySandwich = new ExquisiteSandwich(turkeySandwich)

cust1.buy(turkeySandwich)
cust1.buy(bltSandwich)
```

## Final Thoughts

I used to think that design patterns were these crazy, far-out software development guidelines. Then I found out I use them all the time!

A few of the patterns I covered are used in so many applications that it would blow your mind. They are just theory at the end of the day. It's up to us as developers to use that theory in ways that make our applications easy to implement and maintain.

Have you used any of the other design patterns for your projects? Most places usually pick a design pattern for their projects and stick with it so I'd like to hear from you all about what you use.

[Source](https://www.freecodecamp.org/news/4-design-patterns-to-use-in-web-development/)