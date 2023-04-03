import React, { useContext, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Stack from 'react-bootstrap/esm/Stack';

import { CartContext } from '../contexts/ShoppingCartContext';

/*Componentes */
import ProductHome from '../components/ProductHome';

function ShoppingCart(){  

    const [shoppingCart, setShoppingCart] = useContext(CartContext);
    const totalProductsQuantity = shoppingCart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    return(
        <Offcanvas show={true} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack>
                    {shoppingCart.map(dataProduct => (
                        <ProductHome 
                        key={dataProduct.id}
                        id={dataProduct.id}
                        productName={dataProduct.ProductName}
                        price={dataProduct.Price}
                        size={dataProduct.Size}
                        description={dataProduct.Description}
                      />
                    ))}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default ShoppingCart;