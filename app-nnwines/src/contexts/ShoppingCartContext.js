import React, {createContext, useState} from "react";
import ShoppingCart from '../components/ShoppingCart'

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({children}) => {
    const [shoppingCart, setShoppingCart] = useState([]);

    return<CartContext.Provider value={[shoppingCart, setShoppingCart]}>
            {children}
        </CartContext.Provider>
};