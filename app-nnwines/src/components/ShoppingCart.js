import React, { useContext, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Stack from 'react-bootstrap/esm/Stack';

import { CartContext } from '../contexts/ShoppingCartContext';
/*Componentes */
import ProductHome from './ProductHome';

function ShoppingCart() {  

    const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart] = useContext(CartContext);

    const totalProductsQuantity = shoppingCart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    return(
        <Offcanvas show={openCart} placement='end' scroll onHide={()=> {handleCloseCart()}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito - {totalProductsQuantity} Productos</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack>
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
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default ShoppingCart;