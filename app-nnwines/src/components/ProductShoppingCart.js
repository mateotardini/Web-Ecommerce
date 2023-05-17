import React, { useContext, useState, useRef  } from 'react';
import styles from "../css/ProductShoppingCart.module.css";
import { HiOutlineShoppingBag, HiSearch, HiOutlineCheck } from "react-icons/hi";

import { Link } from "react-router-dom";
import { CartContext } from '../contexts/ShoppingCartContext';

function ProductShoppingCart(props) {

  const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart, getProductQuantity] = useContext(CartContext);  
  
  return (
    /*<Link to={"/Product/"+ props.id}  state={{ props }}></Link>*/
      <div className={styles.containerProductShopping}>
        <img 
         className= {styles.imagenProduct}
         src={require(`../images/Producto.JPG`)}
         alt={"Imagen del Producto" + props.name}/> 
        
        <div className='column'>
          <div className={styles.containerTextProduct}>
            <h3 className={styles.nameProduct}>
              <strong>{props.ProductName}</strong> - {props.Size} ml
            </h3>

            <p className={styles.price}>
              <strong>${props.Price}.00</strong>
            </p> 
          </div>

          <div className={styles.overlayButton}>
              <button className={styles.roundedButton}
              onClick={() => {removeToShoppingCart(props);}}>-
              </button>

              <p className={styles.roundedButton}>{getProductQuantity(props.id)}</p>

              <button className={styles.roundedButton}
              onClick={() =>{addToShoppingCart(props);}}>+
              </button>

              <Link to={"/Product/"+ props.id}  state={{ props }}>
              <button className={styles.roundedButton}>
                <HiSearch/>
              </button>
              </Link>
          </div>
        </div>

      </div>
      
  );
}

export default ProductShoppingCart;