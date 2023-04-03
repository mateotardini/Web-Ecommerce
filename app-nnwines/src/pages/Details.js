import React from 'react';
import { useLocation } from "react-router";

/*Componentes */
import styles from '../css/Details.module.css';

function Details(){
    let props = useLocation().state.props;

    return(
    <div>
      <div className={styles.row}>
        <h1 className={styles.namePropiedad}>{props.name}</h1>
        <h2 className={styles.directionPropiedad}>{props.direction}</h2>
        <h3 className={styles.pricePropiedad}>{props.price} USD</h3>
      </div>
        <img 
          className={styles.imagePropiedad}
          src={require(`../images/${props.image}.png`)}
          alt={"Imagen de Propiedad "}/>
        <p className='descriptionPropiedad'>{props.description}</p>
    </div>
    );
}

export default Details;