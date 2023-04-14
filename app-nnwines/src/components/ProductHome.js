import React, { useContext, useState, useRef  } from 'react';
import styles from "../css/ProductHome.module.css";
import { HiOutlineShoppingBag, HiSearch, HiOutlineCheck } from "react-icons/hi";

import { Link } from "react-router-dom";
import { CartContext } from '../contexts/ShoppingCartContext';

function ProductHome(props) {

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [shoppingCart, setShoppingCart] = useContext(CartContext);  

  const tooltipRef= useRef(null);

  const handleMouseEnter = () => {
    tooltipRef.current.style.display = 'block'; // Mostrar el tooltip al pasar el cursor sobre el elemento
  };

  const handleMouseLeave = () => {
    tooltipRef.current.style.display = 'none'; // Ocultar el tooltip al quitar el cursor del elemento
  };

const addToShoppingCart = () => {
  setShoppingCart((currentProducts) => {
    const foundProduct = currentProducts.find((product) => product.id === props.id);
    setIsAddedToCart(true);

    if (foundProduct) {
      // Si el producto ya está en el carrito, se actualiza su cantidad
      return currentProducts.map((product) => {
        if (product.id === props.id) {
          // Se crea un nuevo objeto con la misma estructura del producto existente
          // pero se actualiza la cantidad
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      });
    } else {
      // Si el producto no está en el carrito, se agrega con una cantidad inicial de 1
      
      return [
        ...currentProducts,
        {
          key: props.id, // Se agrega la key con el valor del id del producto
          id: props.id,
          ProductName: props.ProductName,
          Price: props.Price,
          Size: props.Size,
          Description: props.Description,
          quantity: 1 // Se agrega la cantidad inicial del producto como 1
        }
      ];
    }
  });
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
            <div>
              <button className={styles.roundedButton}
              onClick={addToShoppingCart}>-
              </button>
              <button className={styles.roundedButton}
              onClick={addToShoppingCart}>+
              </button>
            </div>

          ) : (          
          <button className={styles.roundedButton} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={addToShoppingCart}>
              <div ref={tooltipRef} className={styles.tooltip}>Agregar Al Carrito</div>
              
              {isAddedToCart ? (<HiOutlineCheck />) : (<HiOutlineShoppingBag/>)}
            </button>
            )}
          <Link to={"/Product/"+ props.id}  state={{ props }}>
            <button className={styles.roundedButton}>
              <HiSearch/>
            </button>
          </Link>
      </div>
      
      <div className={styles.containerTextProduct}>
        <h2 className={styles.nameProduct}>
          <strong>{props.ProductName}</strong> - {props.Size} ml
        </h2>
        <p className={styles.price}>
          <strong>${props.Price}.00</strong>
        </p>
              
      </div>
      </div>
    //</Link>
  );
}

export default ProductHome;