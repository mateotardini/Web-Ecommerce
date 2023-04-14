import React, { useContext, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Stack from 'react-bootstrap/esm/Stack';

import { CartContext } from '../contexts/ShoppingCartContext';
/*Componentes */
import ProductHome from './ProductHome';

function ShoppingCart() {  

    const [shoppingCart, setShoppingCart] = useContext(CartContext);

    const totalProductsQuantity = shoppingCart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <Offcanvas show={show} placement='end' scroll onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito</Offcanvas.Title>
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