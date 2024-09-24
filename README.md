# State Management Library

This is a simple state management library, inspired by Redux, for managing application state in a functional and minimalistic way. It allows dispatching actions to modify the state using a reducer function, subscribing to state changes, and more.

## Features

- **State Management**: Maintain application state with the help of actions and a reducer.
- **Subscribers**: Subscribe to state changes and get notified whenever the state updates.
- **Replace Reducer**: Hot-reload the reducer function for dynamic adjustments.
- **Undo (Planned)**: A future feature for undoing state changes.

## Installation

Simply add this library to your project and import the `createStore` function:

```js
import { createStore } from "./path-to-lib";
```

## Usage

### Create a Store

To create a store, pass an initial state and a reducer function.

```js
const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(initialState, reducer);
```

### Dispatching Actions

Dispatch actions to modify the state:

```js
store.dispatch({ type: "INCREMENT" });
console.log(store.getState()); // { count: 1 }

store.dispatch({ type: "DECREMENT" });
console.log(store.getState()); // { count: 0 }
```

### Subscribing to State Changes

You can subscribe to the store and get notified of state updates:

```js
const unsubscribe = store.subscribe((newState) => {
  console.log("State changed:", newState);
});

// Don't forget to unsubscribe when needed
unsubscribe();
```

### Replacing the Reducer (Hot Reloading)

You can replace the reducer dynamically. This feature is useful for hot-reloading during development.

```js
const newReducer = (state, action) => {
  // New logic
  return state;
};

store.replaceReducer(newReducer);
```

### Planned Features

- **Undo Functionality**: An undo function will allow reverting the state to a previous version.
- **memoisation**: A way of memoizing the state and checking if the state is still valid or needs updating

## API Reference

### `createStore(initialState, reducer)`

- **`initialState`**: The initial state of the store.
- **`reducer(state, action)`**: A function that takes the current state and an action and returns the new state.

#### Store Methods

- **`dispatch(action)`**: Dispatch an action to update the state.
- **`subscribe(callback)`**: Subscribe to state changes. The `callback` will be called with the new state. Returns an `unsubscribe` function.
- **`getState()`**: Get the current state of the store.
- **`replaceReducer(reducer)`**: Replace the reducer function dynamically and trigger a state update.
