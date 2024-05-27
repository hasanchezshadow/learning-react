import {useReducer} from "react";
import {CART_REDUCER_ACTION_TYPES, cartInitialState, cartReducer} from "../reducers/cart.reducer.js";

export function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState, () => cartInitialState);

    const addToCart = (product) => dispatch({type: CART_REDUCER_ACTION_TYPES.ADD_TO_CART, payload: product});

    const removeFromCart = (product) => dispatch({type: CART_REDUCER_ACTION_TYPES.REMOVE_FROM_CART, payload: product});

    const clearCart = () => dispatch({type: CART_REDUCER_ACTION_TYPES.CLEAR_CART});

    return {
        state,
        addToCart,
        clearCart,
        removeFromCart
    }
}
