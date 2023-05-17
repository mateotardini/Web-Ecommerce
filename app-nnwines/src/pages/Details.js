import React, {useContext} from 'react';
import { useLocation } from 'react-router';

//CSS
import styles from '../css/Details.module.css';

//Contexts
import { CartContext } from '../contexts/ShoppingCartContext';

//Components
import Footer from '../components/Footer';

function Details() {
  let props = useLocation().state.props;

  const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart, getProductQuantity] = useContext(CartContext);  

  // Convertir el objeto Buffer a una cadena de caracteres en formato base64
  const base64String = Buffer.from(props.Image).toString('base64');

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.row}>
          <img
            className={styles.productImage}
            src={`data:image/png;base64,${base64String}`} // Cambiar a 'data:image/jpeg;base64,' si el servidor está enviando la imagen en formato JPEG
            alt={'Imagen de ' + props.ProductName}
            //onError={(e) => {
            //  e.target.src = '../images/Producto.JPG';
            //}}
          />
          <div className={styles.productDataBox}>
            <h1 className={styles.productName}>{props.ProductName}</h1>
            <h2 className={styles.productPrice}>$ {props.Price}</h2>
            <p className={styles.productDescription}>{props.Description}</p>
            <div className={styles.overlayButton}>
              <button className={styles.roundedButton}
              onClick={() => {removeToShoppingCart(props);}}>-
              </button>

              <p className={styles.roundedButton}>{getProductQuantity(props.id)}</p>

              <button className={styles.roundedButton}
              onClick={() =>{addToShoppingCart(props);}}>+
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Details;