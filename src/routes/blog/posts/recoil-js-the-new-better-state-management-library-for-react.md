---
title: Recoil.js — The New, Better State Management Library for React
date: "2021-01-23T08:38:00.000Z"
---

Why is Recoil better than existing libraries and how can you use it?

<!-- more -->

Recoil.js is an extremely nascent state management library for React, open-sourced by Facebook. Though in its infancy, it seems promising for simplifying global state management for React developers. It offers all the features that existing state management libraries do, in, I think, a much better way. It also is compatible with several other features.

This article will help you understand why we need a global state management system in the first place, and why it should be Recoil. After answering these questions, we’ll move on to a short tutorial to see Recoil in action. And no, this isn’t yet another tutorial you can find on the internet where they show you how to update a counter value and increment and decrement it. Instead, we’ll create a simple application to illustrate things that are actually used in real world applications, like fetching data from the server.

The resulting app will look like something like this:

<h2 align="center">
  <img src="https://miro.medium.com/max/589/0*feiLhPfD8jm8Ua4A.gif" width="600px" />
  <br>
</h2>

To understand this article in its entirety, readers are expected to have a fair knowledge of React and React Hooks.

State management in React is one of the topics spoken about the most. Let’s answer a basic question before moving on. Why do we need a State Management Library after all? Although React is self-sufficient in terms of state, it gets complicated when it comes to sharing data among multiple components, asynchronous data fetching, etc.

## Sharing data among multiple components

Suppose you have a contacts app. It shows you a list of contacts and when you select one its details are shown on a card, something like this:

<h2 align="center">
  <img src="https://miro.medium.com/max/715/1*YXlFh9fyPYRIgj0pJXaorw.png" width="600px" />
  <br>
</h2>

In order to maintain modularity, we have the menu (on the left) and the details card (on the right) in two different components. Something like this:

<h2 align="center">
  <img src="https://miro.medium.com/max/382/1*bf5KIRhekS5sNJ3_bBJRfQ.png" width="600px" />
  <br>
</h2>

We want to achieve the following functionality: When we click on the name of a contact, we fetch their details and render it on the right. Since they are not in the same component, you cannot have a state which would guide the details to be displayed. If we’re doing it the React way, we would ideally “lift up” the state to their parent component — i.e., the component which has the menu and the details components as children — and then we would pass that state “down” to the children component.

To put it simply, we would have a state called ```currentContact``` in the parent component, pass the ```currentContact``` state to both the menu and the details components. You would also have to pass down the setter for the state to the menu component, because that component must be able to change a contact. This situation is represented in the following tree:

<h2 align="center">
  <img src="https://miro.medium.com/max/379/1*vWNgrKZOsDSSxIzGPIB7oQ.png" width="600px" />
  <br>
</h2>

This works well. Let’s go one level deeper (literally). Let’s say the contacts list (the list that displays the names of the contacts) is in a separate component and is a child of the ```Menu``` component, resulting in a React DOM Tree something like this:

<h2 align="center">
  <img src="https://miro.medium.com/max/412/1*wDxhyDwbE7_wVijJd1MybA.png" width="600px" />
  <br>
</h2>

Now, you would have to pass the state down two levels, from ```Parent``` to ```Menu``` and from ```Menu``` to ```List```. Perhaps now you understand why we need a global state management system in order to avoid this.

Before moving on to Recoil, let’s address another issue. How do we update the details component when the ```currentContact``` is changed? With other (most) state management libraries, you probably have to inform the library that the state has been updated. Now we want some new data according to the new state — you would probably achieve this using React’s ```useEffect``` hook (which is similar to ```componentDidUpdate```).

Wouldn’t it be nice if somehow the library automatically got to know that a state had been updated and fetches the new data according to the changed state? Of course, it would! Recoil achieves this by maintaining a data graph. Look at the following diagram:

<h2 align="center">
  <img src="https://miro.medium.com/max/460/1*6BdVl6GkQ0O6SPhAha35uA.png" width="600px" />
  <br>
</h2>

This is a dependency graph which shows that the details of the contact are dependent on the currently selected contact in the menu. The ```contactDetails``` state subscribes to the ```currentContact``` state, and whenever the ```currentContact``` state is updated, ```contactDetails``` are automatically re-computed — i.e. details of the new contact are fetched from the server.

Do you know what would be even nicer? If the library automatically informed the UI that data was being fetched from the server, telling it to render a “fallback” (Loading) UI so that the user knows what’s happening. As you may have guessed, Recoil does this too (and much more).

Along with shared state, maintaining a data graph, and enabling asynchronous operations in a really smooth manner, Recoil offers several other features. One of the most promising of these features, and one that distinguishes it from existing libraries, is its compatibility with the Concurrent Mode.

So far, I hope you understand why using Recoil would be beneficial. Before moving on to the tutorial, I would love for you to check out Dave McCabe’s talk at the React Europe 2020 Conference where we first got to know about this awesome library. As he says in the talk, Recoil is the most “Reactish” way of managing state, enabling React developers to seamlessly use it without putting much effort into learning a new API.
You might also want to check out the official docs for a brief introduction to the library and the API.

## Tutorial

We’ll be building a simple contacts app as mentioned above, which would first render the names of all contacts on the sidebar, and as we click on one of the names, the details of that contact will be asynchronously fetched and rendered.

Let’s cover a few basics before we move ahead.

If doing it the React way, you would ideally have a ```useState``` hook to store the ```currentContact``` and use ```setCurrentContact``` (the setter function for the state) to update the current contact when we click on another name. You can achieve similar functionality in Recoil using what is known as an “atom.”

An atom, as the name suggests, is a single unit of state capable of storing any valid form of data (objects, arrays, numbers, strings, etc.), exactly like the React state, except that you can use an atom anywhere in your application. Just as we have the ```useState``` hook in React, we have the ```useRecoilState``` in Recoil which has the same interface as the ```useState``` hook. It takes as an input an atom or a selector (we’ll see what a selector is soon) and returns an array with two values — the value itself and a setter function for this state. With next to no extra effort on your side, you can migrate from ```useState``` to ```useRecoilState```. If you’re not getting it just yet, don’t worry — read on, complete the tutorial and all will become clear.

There may be times where you have to modify an existing state, or use an existing state to produce some other useful output. For example, in our app, we would have to use the ```currentContact``` state to fetch the details of the contact and produce a new state which contains the details of the currently selected contact. For this purpose, to get a “derived state,” we use what’s known as a “selector”.

A selector selects an existing state (which could either be an atom or another selector), “get” the value of the state, use it to perform some action (fetch related data from the server, calculate some value from the existing state, etc.) and return a modified state which we can then use. In our application, we need a selector to first fetch the list of all names (this selector does not depend on any other state) and then another selector to fetch the details of the currently selected contact (this selector depends on the ```currentContact``` state).

As shown in the graph above, since the ```currentContactDetails``` selector depends on the ```currentContact``` state. Whenever the ```currentContact``` state is updated, the ```currentContactDetails``` is re-computed — i.e., new data is fetched according to the newly set currentContact. Worried about fetching the same data repeatedly because we might select the same name? Worry no more. The “selector” wrapper provided by Recoil (we’ll see how to implement this below) acts as a “memoizer,” i.e., it caches the value corresponding to a certain input, so if you request the same contact details again, it will directly fetch it from the cache rather than fetching it from the server. Go ahead and read about Pure Functions and Memoization for better understanding.

When I talked about atoms, I said that the state can be used “anywhere in the application.” How does Recoil help us do this? It offers the ```RecoilRoot``` component, which has to be the parent component of all the components in which we want to access the state. Ideally, this would be the ```index.js``` or ```App.js``` file — i.e., your top-level component.

Finally, let’s get into the code and see how to implement all of this. Here’s the directory structure I’ve used for the project:

<h2 align="center">
  <img src="https://miro.medium.com/max/245/1*Fw8OBm0UpIVj7pFaRowluA.png" width="200px" />
  <br>
</h2>

```javascript
import React from "react";
import { RecoilRoot } from "recoil";

import Details from "./components/Details/Details";
import Sidebar from "./components/Sidebar/Sidebar";

import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <div>
          <Sidebar />
        </div>
        <div>
          <Details />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
```

As you can see, we have our parent component, ```App```, which has two children, ```Sidebar``` and ```Details``` according to our description above. This component is wrapped inside the ```RecoilRoot``` because we want all the children of ```App``` to use the ```Recoil``` state.

```Sidebar``` component:

```javascript
import React, { Suspense } from "react";

import ContactsList from "../ContactList/ContactList";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contacts Menu</h2>
      <div className={styles.list}>
        <Suspense fallback={<h3>Loading Contacts...</h3>}>
          <ContactsList />
        </Suspense>
      </div>
    </div>
  );
};

export default Sidebar;
```

The sidebar component has a title and a ```ContactsList``` component renders our list of contacts. As you can see, the ```ContactsList``` component is wrapped in a ```Suspense```. This allows us to display a fallback (loading) UI when the data for our application is being asynchronously fetched from a server.

Before we look at the ```ContactsList``` component, let’s see how we define the atoms and selectors that enable us to use state variables that are global.

recoil/atoms.js:

```javascript
import { atom } from "recoil";

export const currentContactState = atom({
  key: "currentContactState",
  default: 1,
});
```

It’s as simple as that! Atom is nothing but a function that enables us to store state. It takes a key and a default. The key property must be unique for every atom and selector in your application — this is how the data graph knows that one “node” (or state) is different from another. The default value is exactly like what you would initially pass to the ```useState``` hook.

recoil/selectors.js:

```javascript
import { selector } from "recoil";

import { currentContactState } from "./atoms";
import { getContacts, getDetails } from "../data";

export const contactsList = selector({
  key: "contactsList",
  get: async () => {
    const response = await getContacts();
    return response;
  },
});

export const currentContactDetails = selector({
  key: "currentContactDetails",
  get: async ({ get }) => {
    const response = await getDetails(get(currentContactState));
    return response;
  },
});
```

The ```getContacts``` and ```getDetails``` functions used here simulate the action of a server — i.e., they halt for two seconds and then return the contacts and the details respectively, asynchronously.

A selector is similar to an atom, except it allows you to have a derived state instead of a fixed state (If you’re familiar with Redux, think of this as similar to the Redux thunk middleware where you can execute functions and perform operations before you update the state). Again, a selector is a function that takes an object with two (or optionally three) properties: a ```key```, a ```get``` function (and optionally a ```set``` function if you want to modify the state). The key, as mentioned above, is a unique identifier for this selector. The ```get``` function allows you to get the value stored in the selector. As we’ll see next, we’ll use the ```useRecoilValue``` hook to get the value of a selector.

The ```get``` function of the first selector — ```contactsList``` — simply makes a query to the server to get the names of all contacts. The response that’s returned from the function is what will be available to us in our React Components.

The second selector is slightly more complicated. The ```currentContactDetails``` selector’s ```get``` function is dependent on the ```currentContact``` atom which we defined earlier. This is where we “subscribe” this selector to that atom, so that whenever the atom updates, the selector fetches a new value from the server without our intervention.

The selector’s ```get``` function, receives an object in its parameter which has a property which is also named ```get``` and this parameter guy ```get``` is a function that you can use to fetch the values of other atoms and selectors in the app. So we’ll use this to fetch the value of the ```currentContact``` atom and fetch the appropriate details. If you use the ```get``` function to fetch any recoil state, your selector automatically subscribes to that recoil state and will re-compute whenever any of its dependent-states change.

Now, how do we use these atoms and selectors in our ```ContactsList``` component?

```ContactsList``` component:

```javascript
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import styles from "./ContactList.module.css";

import { currentContactState } from "../../recoil/atoms";
import { contactsList } from "../../recoil/selectors";

const ContactList = () => {
  const [currentContact, setCurrentContact] = useRecoilState(currentContactState);
  const contacts = useRecoilValue(contactsList);

  return contacts.map((contact) => (
    <div
      key={contact.id}
      className={`${styles.name_container} ${
        currentContact === contact.id ? styles.name_selected : null
      }`}
      onClick={() => setCurrentContact(contact.id)}
    >
      {contact.name}
    </div>
  ));
};

export default ContactList;
```

In the first few lines, we’re importing the ```useRecoilState``` and ```useRecoilValue``` hooks along with the atoms and selectors we just defined. In the component, we’re first initializing the atom in the same way we would initialize a React state using the ```useState``` hook. The ```useRecoilState``` hook takes an atom as an input and returns an array that has the state itself and the setter function to modify the state.

As mentioned above, to read the value of the selector, we use the ```useRecoilValue``` hook (you can very well use the ```useRecoilState``` for a selector as well). The component returns the list of all contacts present in the contacts array. The ```classNames``` are just to differentiate between the name currently selected and those which are not. To know which is selected, we use the atom’s value — i.e., the ```currentContact``` state — and update this ```currentContact``` to the new name when we click on it.

But there’s one issue: There is no default value as such for the selector, and, as I said, it takes two seconds for our ```getContacts()``` function to fetch data. What happens in the two seconds it takes for the data to be fetched?

Enter React ```Suspense```.

As I already mentioned, we wrapped the ```ContactsList``` component in ```Suspense```, so any unresolved promise (if you’re not aware of what this means, think of it like data that is currently being fetched) will lead to the rendering of our fallback UI — i.e., “Loading Contacts…”.

```Details``` component:

```javascript
import React, { Suspense } from "react";

import Card from "../Card/Card";

import styles from "./Details.module.css";

const Details = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Suspense fallback={<h3>Loading Details...</h3>}>
          <Card />
        </Suspense>
      </div>
    </div>
  );
};

export default Details;
```

Similar to the ```Sidebar``` component, the ```Details``` component renders a card that will display the details of the selected contact.

```Card``` component:

```javascript
import React from "react";
import { useRecoilValue } from "recoil";

import { currentContactDetails } from "../../recoil/selectors";

const Card = () => {
  const contact = useRecoilValue(currentContactDetails);

  return (
    <>
      <h3>{contact.name}</h3>
      <span>ADDRESS : {contact.address}</span>
      <span>PHONE : {contact.phone}</span>
      <span>EMAIL : {contact.email}</span>
    </>
  );
};

export default Card;
```

As you can see, we get the details of the current contact from the ```currentContactDetails``` selector that we defined earlier.

Putting it all together: When we select a name on the sidebar component, the atom ```currentContact``` is updated, which in turn leads to the ```currentContactDetails``` selector being updated, which in turn leads to the Card UI being updated with the new contact’s details.

## Summary

We first saw why we need a global state, then looked at the cool features that Recoil has, then we implemented a simple application, like one that you would use in the real-world. If you’ve read all of that, I give you my heartfelt gratitude!

That brings us to the end of this tutorial on Recoil.js. I hope you have understood the concept of Recoil and how to implement it in your applications.

Note: I do not suggest you use Recoil in a production application yet — the API is currently unstable (as of 30th May, 2020) and under development. But the popularity that it has started to gain despite being a library which was released just a couple of weeks ago illustrates the power and utility of Recoil.

[Source](https://medium.com/better-programming/recoil-js-the-new-better-state-management-library-for-react-1095947b5191)