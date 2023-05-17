import React, { useContext, useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Stack from 'react-bootstrap/esm/Stack';

import { CartContext } from '../contexts/ShoppingCartContext';

/*Componentes */
import ProductShoppingCart from './ProductShoppingCart.js';

function ShoppingCart() {  

    const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart] = useContext(CartContext);

    const totalProductsQuantity = shoppingCart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => { // Calcula el precio total al cambiar el carrito de compras
        const calculateTotalPrice = () => {
            const total = shoppingCart.reduce((acc, curr) => {
                return acc + (curr.Price * curr.quantity);
            }, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [shoppingCart]);
    
    const sendWhatsAppMessage = () => { // Función para generar el enlace de WhatsApp con la lista de productos
        const message = `¡Hola NNWines! Les comparto mi lista de productos:\n\n` +
            shoppingCart.map(item => `${item.quantity} x ${item.ProductName} - Precio: $ ${item.Price}\n`).join('') +
            `Total: $ ${totalPrice}`;
        const encodedMessage = encodeURIComponent(message);
        // Genera el enlace de WhatsApp con el mensaje predefinido
        const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}&phone=5491163733844`;
        window.open(whatsappLink, '_blank');
    }

    return(
        <Offcanvas show={openCart} placement='end' onHide={()=> {handleCloseCart()}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito - {totalProductsQuantity} Productos - $ {totalPrice}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack>
                    {shoppingCart.map(item => (
                        <ProductShoppingCart 
                            key={item.id}
                            id={item.id}
                            ProductName={item.ProductName} 
                            Price={item.Price} 
                            Size={item.Size} 
                            Description={item.Description}
                        />
                    ))}
                    <h2>Total: $ {totalPrice}</h2>
                    <button className='button-borderline' 
                        onClick={sendWhatsAppMessage}>Realizar Reserva por WhatsApp</button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default ShoppingCart;