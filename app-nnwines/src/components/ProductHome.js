import React, { useContext, useState, useRef  } from 'react';
import styles from "../css/ProductHome.module.css";
import { HiOutlineShoppingBag, HiSearch, HiOutlineCheck } from "react-icons/hi";

import { Link } from "react-router-dom";
import { CartContext } from '../contexts/ShoppingCartContext';

function ProductHome(props) {

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart] = useContext(CartContext);  

  const tooltipRef= useRef(null);

  const handleMouseEnter = () => {
    tooltipRef.current.style.display = 'block'; // Mostrar el tooltip al pasar el cursor sobre el elemento
  };

  const handleMouseLeave = () => {
    tooltipRef.current.style.display = 'none'; // Ocultar el tooltip al quitar el cursor del elemento
  };

  return (
    //<Link to={"/Product/"+ props.id}  state={{ props }}>
      <div className={styles.containerProductHome}>
      <img 
        className= {styles.imagenProduct}
        src={require(`../images/Producto.JPG`)}
        alt={"Imagen del Producto" + props.name}/>

      <div className={styles.overlayButton}>
          {isAddedToCart ? (
            <div className="row">
              <button className={styles.roundedButton}
              onClick={() => {removeToShoppingCart(props);}}>-
              </button>
              <button className={styles.roundedButton}
              onClick={() =>{addToShoppingCart(props);}}>+
              </button>
            </div>

          ) : (          
          <button className={styles.roundedButton} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {addToShoppingCart(props);setIsAddedToCart(true);}}>
              <div ref={tooltipRef} className={styles.tooltip}>Agregar Al Carrito</div>
              <HiOutlineShoppingBag/>
            </button>
            )}

          <Link to={"/Product/"+ props.id}  state={{ props }}>
            <button className={styles.roundedButton}>
              <HiSearch/>
            </button>
          </Link>
      </div>
      
      <div className={styles.containerTextProduct}>
        <h3 className={styles.nameProduct}>
          <strong>{props.ProductName}</strong> - {props.Size} ml
        </h3>
        <p className={styles.price}>
          <strong>${props.Price}.00</strong>
        </p>
              
      </div>
      </div>
    //</Link>
  );
}

export default ProductHome;