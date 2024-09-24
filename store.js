/**
 * @typedef {object} State
 */

/**
 * @typedef {object} Action
 * @prop {string} type
 * @prop {any} payload
 */

/**
 * @callback Subscriber
 * @param {State} state
 */

/**
 * @callback Unsubscribe
 */

/**
 * @callback Reducer
 * @param {State} prev
 * @param {Action} action
 */

/**
 *
 * @param {any} initialState
 * @param {Reducer} reducer
 */
export const createStore = (initialState, reducer) => {
  const state = [initialState]; // Changed to array with single initial state
  const subscribers = [];
  let localReducer = reducer; 

  /**
   * Dispatch sends an event and updates the state
   * @param {Action} action
   */
  const dispatch = ({ type, payload }) => {
    const action = { type, payload };
    update(action);
    subscribers.forEach((callback) => callback(state[0]));
  };

  // updates the state of the store using the supplied action and reducer callback
  const update = (action) => {
    const prev = Object.freeze({ ...state[0] }); // insuring users cant manipulate the state
    const next = Object.freeze({ ...localReducer(prev, action) });
    state.unshift(next);

    if (state.length > 3) {
      state.pop();
    }
  };

  /**
   * Subscribes to state changes
   * @param {Subscriber} callback
   * @returns {Unsubscribe} a function that removes the subscribed callback
   */
  const subscribe = (callback) => {
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index > -1) subscribers.splice(index, 1);
    };
  };

  /**
   * Returns the current state of the store
   * @returns {State}
   */
  const getState = () => {
    return state[0];
  };

  //TODO: Implement a replace reducer function for hot reloading functionally
  /**
   * hot reloads the reducer function
   * @param {Reducer} reducer
   * @returns {void}
   */
  const replaceReducer = (reducer) => {
    localReducer = reducer;
    dispatch({ type: "@@INIT" }); // trigger a state update with new reducer
  };

  //TODO: Implement a undo function

  dispatch({ type: "@@INIT" }); // set up initial state on subscriber's callback

  return {
    dispatch,
    subscribe,
    getState,
    // amenities
    replaceReducer,
    // undo, // undo feature is not implemented yet
  };
};
