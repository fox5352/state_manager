import { createStore } from "./store.js";
import { reducer } from "./utils/testReducer.js";

describe('Testing store', () => {
    let store = createStore({counter: 0}, reducer);

    test('test getState function', () => {        
        expect(store.getState().counter).toBe(0);
    });

    test('test dispatch increment function', () => {
        const before = store.getState().counter;
        store.dispatch({type: "INCREMENT"});
        const after = store.getState().counter;
        expect(after).toBe(before + 1);
    });

    test('test dispatch decrement function', () => {
        const before = store.getState().counter;
        store.dispatch({type: "DECREMENT"});
        const after = store.getState().counter;
        expect(after).toBe(before - 1);
    });

    test('test dispatch with payload', () => {
        const payload = {counter: 5};
        store.dispatch({type: "SET_COUNTER", payload});
        expect(store.getState().counter).toBe(payload.counter);
    });

    test('test subscriber function', () => {
        let count = 0;
        const subscriber = () => {
            count++;
        };
        const unSub = store.subscribe(subscriber);
        store.dispatch({type: "INCREMENT"});
        store.dispatch({type: "DECREMENT"});
        store.dispatch({type: "SET_COUNTER", payload: {counter: 10}});
        expect(count).toBe(3); // 3 calls to the subscriber, one for each dispatch
        unSub();// unsubscribes the subscriber
        store.dispatch({type: "INCREMENT"}); // no more calls to the subscriber
        expect(count).toBe(3); // still 3 calls to the subscriber
    });
});