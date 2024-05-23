import {RemoveFromCartIcon, ClearCartIcon, CartIcon} from './Icons.jsx';
import './Cart.css';
import {useId, useState} from "react";
import {useCart} from "../hooks/useCart.js";
import {CartItem} from "./CartItem.jsx";
export function Cart() {
    const cartCheckboxId = useId();
    const {cart, addToCart, clearCart} = useCart();

    return (
        <>
            <label className={'cart-button'} htmlFor={cartCheckboxId}><CartIcon/></label>
            <input type="checkbox" id={cartCheckboxId} hidden={true}/>

            <aside className={'cart'}>
                <ul>
                    {
                        cart.map((product) => {
                            return (
                                <CartItem
                                    key={product.id}
                                    addToCart={() => addToCart(product)}
                                    {...product}
                                />
                            )
                        })
                    }
                </ul>
                <button onClick={clearCart}><ClearCartIcon/></button>
            </aside>
        </>
    );
}
