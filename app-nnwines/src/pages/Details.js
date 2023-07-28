import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
/*CSS*/
import styles from '../css/Details.module.css';
/*Contexts*/
import { CartContext } from '../contexts/ShoppingCartContext';
/*Componentes*/
import LoadingDots from '../components/LoadingDots';
import Footer from '../components/Footer';

function Details() {
  const location = useLocation();
  const props = location.state ? location.state.props : null; // Verifica si hay props, si no, asigna null

  // Estado para almacenar los datos del producto
  const [productData, setProductData] = useState(null);

  // Obtenemos los métodos y el estado del carrito desde el contexto
  const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart, getProductQuantity] = useContext(CartContext);

  useEffect(() => {
    // Si no hay props, se realiza la llamada a la API para obtener los datos
    if (!props) {
      // Obtenemos el id del producto desde la URL
      const id = location.pathname.split('/').pop();

      // URL de la API con el id del producto
      const apiURL = `https://nn-wines.onrender.com/api/database/id/${id}`;

      fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
          setProductData(data);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del producto:', error);
        });
    } else {
      setProductData(props);
    }
  }, [props, location.pathname]);

  while (!productData) {
    return <LoadingDots />;
  }

  console.log(productData.Image);
  // Convertir el objeto Buffer a una cadena de caracteres en formato base64
  const base64String = Buffer.from(productData.Image).toString('base64');

  // Reemplazar saltos de línea en props
  const formattedDescription = productData.Description.replace(/\n/g, '<br />');

  // Formatear el precio con separadores de decimales y miles
  const formattedPrice = productData.Price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.row}>
          <img
            className={styles.productImage}
            src={`data:image/png;base64,${base64String}`}
            alt={'Imagen de ' + productData.ProductName}
          />
          <div className={styles.productDataBox}>
            <h1 className={styles.productName}>{productData.ProductName}</h1>
            <h3>{productData.Size} ml</h3>
            <h2 className={styles.productPrice}>$ {formattedPrice}</h2>
            <p
              className={styles.productDescription}
              dangerouslySetInnerHTML={{ __html: formattedDescription }}
            ></p>
            <div className={styles.overlayButton}>
              <button
                className={styles.roundedButton}
                onClick={() => {
                  removeToShoppingCart(productData);
                }}
              >
                -
              </button>

              <p className={styles.roundedButton}>
                {getProductQuantity(productData.id)}
              </p>

              <button
                className={styles.roundedButton}
                onClick={() => {
                  addToShoppingCart(productData);
                }}
              >
                +
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