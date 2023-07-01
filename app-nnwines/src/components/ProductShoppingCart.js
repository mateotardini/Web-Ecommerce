import React, { useContext, useState, useRef } from 'react';
import { Link } from "react-router-dom";
/*Iconos*/
import { HiOutlineShoppingBag, HiSearch, HiOutlineCheck } from "react-icons/hi";
/*CSS*/
import styles from "../css/ProductShoppingCart.module.css";
/*Componentes*/
import { CartContext } from '../contexts/ShoppingCartContext';

function ProductShoppingCart(props) {

  const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart, getProductQuantity] = useContext(CartContext);

  // Convertir el objeto Buffer a una cadena de caracteres en formato base64
  const base64String = props.Image ? Buffer.from(props.Image).toString('base64') : '';

  // Formatear el precio con separadores de decimales y miles
  const formattedPrice = props.Price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    /*<Link to={"/Product/"+ props.id}  state={{ props }}></Link>*/
    <div className={styles.containerProductShopping}>
      <img
        className={styles.imagenProduct}
        src={`data:image/png;base64,${base64String}`}
        alt={"Imagen de " + props.ProductName} />

      <div className='column'>
        <div className={styles.containerTextProduct}>
          <h3 className={styles.nameProduct}>
            <strong>{props.ProductName}</strong> - {props.Size} ml
          </h3>

          <p className={styles.price}>
            <strong>${formattedPrice}</strong>
          </p>
        </div>

        <div className={styles.overlayButton}>
          <button className={styles.roundedButton}
            onClick={() => { removeToShoppingCart(props); }}>-
          </button>

          <p className={styles.roundedButton}>{getProductQuantity(props.id)}</p>

          <button className={styles.roundedButton}
            onClick={() => { addToShoppingCart(props); }}>+
          </button>

          <Link to={"/Product/" + props.id} state={{ props }}>
            <button className={styles.roundedButton}>
              <HiSearch />
            </button>
          </Link>
        </div>
      </div>

    </div>

  );
}

export default ProductShoppingCart;