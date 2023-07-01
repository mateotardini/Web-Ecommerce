import React, { useContext } from 'react';
import { useLocation } from 'react-router';
/*CSS*/
import styles from '../css/Details.module.css';
/*Contexts*/
import { CartContext } from '../contexts/ShoppingCartContext';
/*Componentes*/
import Footer from '../components/Footer';

function Details() {
  let props = useLocation().state.props;

  const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart, getProductQuantity] = useContext(CartContext);

  // Convertir el objeto Buffer a una cadena de caracteres en formato base64
  const base64String = Buffer.from(props.Image).toString('base64');

  // Reemplazar saltos de línea en props.Description por etiquetas <br />
  const formattedDescription = props.Description.replace(/\n/g, '<br />');

  // Formatear el precio con separadores de decimales y miles
  const formattedPrice = props.Price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.row}>
          <img
            className={styles.productImage}
            src={`data:image/png;base64,${base64String}`}
            alt={'Imagen de ' + props.ProductName}
          />
          <div className={styles.productDataBox}>
            <h1 className={styles.productName}>{props.ProductName}</h1>
            <h3>{props.Size} ml</h3>
            <h2 className={styles.productPrice}>$ {formattedPrice}</h2>
            <p className={styles.productDescription} dangerouslySetInnerHTML={{ __html: formattedDescription }}></p>
            <div className={styles.overlayButton}>
              <button className={styles.roundedButton}
                onClick={() => { removeToShoppingCart(props); }}>-
              </button>

              <p className={styles.roundedButton}>{getProductQuantity(props.id)}</p>

              <button className={styles.roundedButton}
                onClick={() => { addToShoppingCart(props); }}>+
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;