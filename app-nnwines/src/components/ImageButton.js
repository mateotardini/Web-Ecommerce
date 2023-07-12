import React from 'react';
import { Link } from 'react-router-dom';
/*CSS*/
import styles from "../css/ImageButton.module.css";

function ImageButton() {
  return (
    <div className={`${styles.container} row`}>
      <Link to="/products" className={styles.imageButton}>
        <h2 className={styles.buttonText}>TINTOS</h2>
        <img src={require(`../images/PinotNoir.jpg`)} alt='Tintos NN Wines' />
      </Link>
      <Link to="/products" className={styles.imageButton}>
        <h2 className={styles.buttonText}>BLANCOS</h2>
        <img src={require(`../images/Blancos.jpg`)} alt='Tintos NN Wines' />
      </Link>
      <Link to="/products" className={styles.imageButton}>
        <h2 className={styles.buttonText}>ROSÉ</h2>
        <img src={require(`../images/Rosados.jpg`)} alt='Tintos NN Wines' />
      </Link>
      <Link to="/products" className={styles.imageButton}>
        <h2 className={styles.buttonText}>PINOT NOIR</h2>
        <img src={require(`../images/French.jpg`)} alt='Tintos NN Wines' />
      </Link>
    </div>
  );
}

export default ImageButton;