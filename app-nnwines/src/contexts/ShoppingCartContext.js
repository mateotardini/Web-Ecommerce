import React, { createContext, useState } from "react";

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  
  const addProductToCart = (product) => {

  }

  const removeProductToCart = (product) => {
    
  } 

  return (
    <CartContext.Provider value={[shoppingCart, setShoppingCart]}>
      {children}
    </CartContext.Provider>
  );
};