import React from 'react';
import { useLocation } from "react-router";
import bufferToDataUrl from 'buffer-to-data-url'; 

/*Componentes */
import styles from '../css/Details.module.css';

function Details(){
    let props = useLocation().state.props;
    console.log(props.Image);

    // Convertir la imagen en formato Buffer a una URL de datos
    const imageSrc = bufferToDataUrl(props.Image, 'image/jpeg');
    return(
    <div>
      <div className={styles.row}>
        <h1 className={styles.namePropiedad}>{props.ProductName}</h1>
        <h2 className={styles.directionPropiedad}>{props.Direction}</h2>
        <h3 className={styles.pricePropiedad}>{props.Price} USD</h3>
      </div>
        <img 
          className={styles.imagePropiedad}
          src={imageSrc}
          alt={"Imagen de Propiedad "}/>
        <p className={styles.descriptionPropiedad}>{props.Description}</p>
    </div>
    );
}

export default Details;