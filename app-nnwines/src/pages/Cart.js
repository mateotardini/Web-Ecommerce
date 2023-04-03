import React, { useContext, useState } from 'react';

import { CartContext } from '../contexts/ShoppingCartContext';

/*Componentes */
import ProductHome from '../components/ProductHome';

function Cart(){
    const [shoppingCart, setShoppingCart] = useContext(CartContext);

    return(
        <div>
            {shoppingCart.map(item => (
                <ProductHome 
                key={item.id}
                id={item.id}
                productName={item.ProductName}
                price={item.Price}
                size={item.Size}
                description={item.Description}
                />
            ))}
        </div>
    );
}

export default Cart;