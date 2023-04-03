import React, { useContext, useState } from 'react';
import styles from "../css/ProductHome.module.css";
import { HiOutlineShoppingBag, HiSearch } from "react-icons/hi";

import { Link } from "react-router-dom";
import { CartContext } from '../contexts/ShoppingCartContext';

function ProductHome(props) {
  console.log(props);

  const [showMessage, setShowMessage] = useState(false);

  const [shoppingCart, setShoppingCart] = useContext(CartContext);  
  
  const addToShoppingCart = () =>{
    
    setShoppingCart((currentProducts) => {
      const foundProduct = currentProducts.find((product) => product.id === props.id);

      if(foundProduct){
        return currentProducts.map((product) => {
          if(product.id === props.id){
            return{...product, quantity: product.quantity + 1}
          }else{
            return product;
          }
        });
      }else{
        return[...currentProducts, {props, quantity:1}];
      }
    });
  }



  return (
    //<Link to={"/Product/"+ props.id}  state={{ props }}>
      <div className={styles.containerProductHome}>
      <img 
        className= {styles.imagenProduct}
        src={require(`../images/Captura-NNWines.PNG`)}
        alt={"Imagen del Producto" + props.name}/>

      <div className={styles.overlayButton}>

          <button className={styles.roundedButton} 
          onClick={addToShoppingCart}
          onMouseEnter={() => {
            setShowMessage(true);
          }}
          onMouseLeave={() => {
            setShowMessage(false);
          }}>
            <HiOutlineShoppingBag/>
          </button>

          <Link to={"/Product/"+ props.id}  state={{ props }}>
            <button className={styles.roundedButton}>
              <HiSearch/>
            </button>
          </Link>
      </div>
      
      <div className={styles.containerTextProduct}>
        <h2 className={styles.nameProduct}>
          <strong>{props.productName}</strong>
          <p>{props.size} ml</p>
        </h2>
        <p className={styles.price}>
          <strong>${props.price}.00</strong>
        </p>
              
      </div>
      </div>
    //</Link>
  );
}

export default ProductHome;