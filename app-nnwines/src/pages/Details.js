import React from 'react';
import { useLocation } from 'react-router';
import styles from '../css/Details.module.css';

function Details() {
  let props = useLocation().state.props;

  // Convertir el objeto Buffer a una cadena de caracteres en formato base64
  const base64String = Buffer.from(props.Image).toString('base64');

  return (
    <div>
      <div className={styles.row}>
        <h1 className={styles.namePropiedad}>{props.ProductName}</h1>
        <h2 className={styles.directionPropiedad}>{props.Direction}</h2>
        <h3 className={styles.pricePropiedad}>{props.Price} USD</h3>
      </div>
      <img
        className={styles.imagePropiedad}
        src={`data:image/png;base64,${base64String}`} // Cambiar a 'data:image/jpeg;base64,' si el servidor está enviando la imagen en formato JPEG
        alt={'Imagen de ' + props.ProductName}
      />
      <p className={styles.descriptionPropiedad}>{props.Description}</p>
    </div>
  );
}

export default Details;