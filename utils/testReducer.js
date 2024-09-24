/**
 * INCREMENT, DECREMENT, RESET, SET_COUNTER
 */
export const reducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case 'INCREMENT':
            return {...state, counter: state.counter + 1};
        case 'DECREMENT':
            return {...state, counter: state.counter - 1};
        case "RESET":
            return {...state, counter: 0};
        case "SET_COUNTER":            
            return {...state, counter: payload.counter};
        default:
            return state;
    }
}