export const cartInitialState = JSON.parse(localStorage.getItem('react_cart')) || [];
export const CART_REDUCER_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

// update localstorage with state for cart
export const updateLocalStorage = (state) => {
    localStorage.setItem('react_cart', JSON.stringify(state));
}
export const removeCartFromLocalStorage = () => {
    localStorage.removeItem('react_cart')
}

const UPDATE_STATE_BY_ACTION = {
    [CART_REDUCER_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
        let newState = [];
        const {id} = action.payload;
        const productInCartIndex = state.findIndex((item) => item.id === id);
        if (productInCartIndex !== -1) {
            // Using structured clone
            // newState = structuredClone(state);
            // newState[productInCartIndex].quantity++;

            // Using map
            // newState = state.map(item => {
            //     if (item.id === id) {
            //         return {
            //             ...item,
            //             quantity: item.quantity + 1
            //         }
            //     }
            //     return item;
            // });

            // Using spread operator y slice
            newState = [
                ...state.slice(0, productInCartIndex),
                {
                    ...state[productInCartIndex],
                    quantity: state[productInCartIndex].quantity + 1
                },
                ...state.slice(productInCartIndex + 1)
            ]

            updateLocalStorage(newState);
            return newState;
        }

        newState = [
            ...state,
            {
                ...action.payload,
                quantity: 1
            }
        ];
        updateLocalStorage(newState);
        return newState;
    },
    [CART_REDUCER_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
        const {id} = action.payload;
        const newState = state.filter((item) => item.id !== id);
        updateLocalStorage(newState);
        return newState;
    },
    [CART_REDUCER_ACTION_TYPES.CLEAR_CART]: () => {
        const newState = [];
        updateLocalStorage(newState);
        return newState;
    }
}

export const cartReducer = (state, action) => {
    const {type: actionType} = action;

    // Using Switch
    // let newState = [];
    // switch (actionType) {
    //     case CART_REDUCER_ACTION_TYPES.ADD_TO_CART: {
    //         const {id} = actionPayload;
    //         const productInCartIndex = state.findIndex((item) => item.id === id);
    //         if (productInCartIndex !== -1) {
    //             newState = structuredClone(state);
    //             newState[productInCartIndex].quantity++;
    //             break;
    //         }
    //
    //         newState = [
    //             ...state,
    //             {
    //                 ...actionPayload,
    //                 quantity: 1
    //             }
    //         ];
    //         break;
    //     }
    //     case CART_REDUCER_ACTION_TYPES.REMOVE_FROM_CART: {
    //         const {id} = actionPayload;
    //         newState = state.filter((item) => item.id !== id);
    //         break;
    //     }
    //     case CART_REDUCER_ACTION_TYPES.CLEAR_CART: {
    //         newState = [];
    //         break;
    //     }
    // }
    //
    // updateLocalStorage(newState);
    // return newState;

    // Using object property matching
    const updateState = UPDATE_STATE_BY_ACTION[actionType];
    return updateState ? updateState(state, action) : state;
}
