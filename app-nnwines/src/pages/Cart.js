import React, { useContext, useState } from 'react';

import { CartContext } from '../contexts/ShoppingCartContext';

/*Componentes */
import ProductHome from '../components/ProductHome';
import Footer from '../components/Footer';

function Cart() {
    const [shoppingCart, setShoppingCart] = useContext(CartContext);
    console.log("Productos en el carrito:", shoppingCart);
  
    return (
      <div>
        <div className='grid'>
            {shoppingCart.map(item => (
                <ProductHome 
                    key={item.id}
                    id={item.id}
                    ProductName={item.ProductName} 
                    Price={item.Price} 
                    Size={item.Size} 
                    Description={item.Description}
                />
            ))}
        </div>
        <Footer/>
      </div>
    );
  }
export default Cart;