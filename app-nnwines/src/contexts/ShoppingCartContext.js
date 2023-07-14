import React, { createContext, useState, useEffect } from "react";
export const CartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    const storedCartTimestamp = localStorage.getItem('shoppingCartTimestamp');

    if (storedCart && storedCartTimestamp) {
      const timestamp = parseInt(storedCartTimestamp);
      const now = new Date().getTime();
      const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;

      if (now - timestamp <= twoDaysInMilliseconds) {
        return JSON.parse(storedCart);
      }
    }

    return [];
  });

  const [openCart, setOpenCart] = useState(false);

  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);

  const getProductQuantity = (id) => {
    const product = shoppingCart.find((product) => product.id === id);
    return product ? product.quantity : 0;
  };

  const addToShoppingCart = (props) => {
    setShoppingCart((currentProducts) => {
      const foundProduct = currentProducts.find((product) => product.id === props.id);

      if (foundProduct) {
        return currentProducts.map((product) => {
          if (product.id === props.id) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });
      } else {
        return [
          ...currentProducts,
          {
            key: props.id,
            id: props.id,
            ProductName: props.ProductName,
            Price: props.Price,
            Size: props.Size,
            Description: props.Description,
            Image: props.Image,
            quantity: 1
          }
        ];
      }
    });
  };

  const removeToShoppingCart = (props) => {
    setShoppingCart((currentProducts) => {
      const productIndex = currentProducts.findIndex((product) => product.id === props.id);
      if (productIndex !== -1) {
        const updatedProducts = [...currentProducts];
        const product = updatedProducts[productIndex];
        if (product.quantity > 1) {
          // Actualizar la cantidad del producto en el carrito
          product.quantity -= 1;
        } else {
          // Eliminar el producto del carrito cuando la cantidad llega a cero
          updatedProducts.splice(productIndex, 1);
        }
        return updatedProducts;
      } else {
        return currentProducts;
      }
    });
  };

  // Guardar el estado del carrito en el Local Storage y la marca de tiempo actual cada vez que se actualiza
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    localStorage.setItem('shoppingCartTimestamp', new Date().getTime().toString());
  }, [shoppingCart]);

  return (
    <CartContext.Provider value={[shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart, getProductQuantity]}>
      {children}
    </CartContext.Provider>
  );
};