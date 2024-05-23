import {createContext, useState} from "react";

export const CartContext = createContext();

// 2. Create the provider to provide the context
export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const productInCartIndex = cart.findIndex((item) => item.id === product.id);
        if (productInCartIndex !== -1) {
            const newCart = structuredClone(cart);
            newCart[productInCartIndex].quantity++;
             return setCart(newCart);
        }

        setCart((prevState) => ([
                ...prevState,
            {
                ...product,
                quantity: 1
            }
            ])
        );
    }

    const removeFromCart = (product) => {
        setCart((prevState) => prevState.filter((item) => item.id !== product.id));
    }

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
}
