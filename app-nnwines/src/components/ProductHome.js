import React, { useContext, useState, useRef } from 'react';
import { Link } from "react-router-dom";
/*Iconos*/
import { HiOutlineShoppingBag, HiSearch, HiOutlineCheck } from "react-icons/hi";
/*CSS*/
import styles from "../css/ProductHome.module.css";
/*Context*/
import { CartContext } from '../contexts/ShoppingCartContext';

function ProductHome(props) {

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart, getProductQuantity] = useContext(CartContext);

  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    tooltipRef.current.style.display = 'block';
  };

  const handleMouseLeave = () => {
    tooltipRef.current.style.display = 'none';
  };

  // Convertir el objeto Buffer a una cadena de caracteres en formato base64
  const base64String = props.Image ? Buffer.from(props.Image).toString('base64') : '';

  // Formatear el precio con separadores de decimales y miles
  const formattedPrice = props.Price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={styles.containerProductHome}>
      <img
        className={styles.imagenProduct}
        src={`data:image/png;base64,${base64String}`}
        alt={"Imagen del Producto " + props.ProductName}
      />

      <div className={styles.overlayButton}>
        {(isAddedToCart && getProductQuantity(props.id) > 0) ? (
          <div className="row">
            <button className={styles.roundedButton}
              onClick={() => { removeToShoppingCart(props); }}>-
            </button>
            <p className={styles.roundedButton}>{getProductQuantity(props.id)}</p>
            <button className={styles.roundedButton}
              onClick={() => { addToShoppingCart(props); }}>+
            </button>
          </div>

        ) : (
          <button className={styles.roundedButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => { addToShoppingCart(props); setIsAddedToCart(true); }}>
            <div ref={tooltipRef} className={styles.tooltip}>Agregar Al Carrito</div>
            <HiOutlineShoppingBag />
          </button>
        )}

        <Link to={"/Details/" + props.id} state={{ props }}>
          <button className={styles.roundedButton}>
            <HiSearch />
          </button>
        </Link>
      </div>

      <div className={styles.containerTextProduct}>
        <h3 className={styles.nameProduct}>
          <strong>{props.ProductName}</strong> - {props.Size} ml
        </h3>
        <p>{props.Variety}</p>
        <p className={styles.price}>
          <strong>${formattedPrice}</strong>
        </p>
      </div>
    </div>
  );
}

export default ProductHome;