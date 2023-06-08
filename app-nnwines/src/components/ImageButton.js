import React from 'react';
import { Link } from 'react-router-dom';

import styles from "../css/ImageButton.module.css";

function ImageButton() {
  return (
    <div className='row'>
        <Link to="/products" className={styles.imageButton}>
            <h2 className={styles.buttonText}>TINTOS</h2>
            <img src={require(`../images/ImageButton_1.jpg`)} alt='Tintos NN Wines'/>
        </Link>
        <Link to="/products" className={styles.imageButton}>
            <h2 className={styles.buttonText}>BLANCOS</h2>
            <img src={require(`../images/ImageButton_2.jpg`)} alt='Tintos NN Wines'/>
        </Link>
        <Link to="/products" className={styles.imageButton}>
            <h2 className={styles.buttonText}>TINTOS</h2>
            <img src={require(`../images/ImageButton_1.jpg`)} alt='Tintos NN Wines'/>
        </Link>
    </div>
  );
}

export default ImageButton;