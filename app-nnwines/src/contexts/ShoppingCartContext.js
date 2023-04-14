import React, { createContext, useState } from "react";

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [openCart, setOpenCart] = useState(true);

  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart= () => setOpenCart(false);

  const addToShoppingCart = (props) => {
    setShoppingCart((currentProducts) => {
      const foundProduct = currentProducts.find((product) => product.id === props.id);
      //setIsAddedToCart(true);
  
      if (foundProduct) {
        // Si el producto ya está en el carrito, se actualiza su cantidad
        return currentProducts.map((product) => {
          if (product.id === props.id) {
            // Se crea un nuevo objeto con la misma estructura del producto existente
            // pero se actualiza la cantidad
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });
      } else {
        // Si el producto no está en el carrito, se agrega con una cantidad inicial de 1
        
        return [
          ...currentProducts,
          {
            key: props.id, // Se agrega la key con el valor del id del producto
            id: props.id,
            ProductName: props.ProductName,
            Price: props.Price,
            Size: props.Size,
            Description: props.Description,
            quantity: 1 // Se agrega la cantidad inicial del producto como 1
          }
        ];
      }
    });
  };

  const removeToShoppingCart = (props) =>     
    setShoppingCart((currentProducts) => {
    const foundProduct = currentProducts.find((product) => product.id === props.id);
    //setIsAddedToCart(true);

    if (foundProduct) {
      // Si el producto ya está en el carrito, se actualiza su cantidad
      return currentProducts.map((product) => {
        if (product.id === props.id) {
          // Se crea un nuevo objeto con la misma estructura del producto existente
          // pero se actualiza la cantidad
          return { ...product, quantity: product.quantity - 1 };
        } else {
          return product;
        }
      });
    }
  });


  return (
    <CartContext.Provider value={[shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart]}>
      {children}
    </CartContext.Provider>
  );
};