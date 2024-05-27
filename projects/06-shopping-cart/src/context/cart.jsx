import {createContext} from "react";
import {useCartReducer} from "../hooks/useCartReducer.js";

export const CartContext = createContext();

// 2. Create the provider to provide the context
export const CartProvider = ({children}) => {

    const {
        state,
        addToCart,
        clearCart,
        removeFromCart
    } = useCartReducer();

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
}
