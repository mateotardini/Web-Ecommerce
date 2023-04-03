import React, { useContext } from 'react';

import { HiOutlineShoppingCart } from "react-icons/hi";

import styles from "../css/NavBar.module.css";

import { Link } from "react-router-dom";
import { CartContext } from '../contexts/ShoppingCartContext';

function NavBar(){
    const [shoppingCart, setShoppingCart] = useContext(CartContext);
    const totalProductsQuantity = shoppingCart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    return(
        <div className={styles.container}>
            <img className={styles.logo}
            src={require(`../images/NN WINE COLOR.png`)}
            alt='Logo NN Wines'
            />
            <ul className={styles.menuNavBar}>
                <li>
                    <Link to="/">
                        <div className={styles.menuButton}>inicio</div>
                    </Link>
                </li>
                <li>
                    <Link to="/Products">
                        <div className={styles.menuButton}>productos</div>
                    </Link>
                </li>
                <li>
                    <Link to="/Como-Comprar">
                        <div className={styles.menuButton}>cómo comprar</div>
                    </Link>
                </li>
                <li>
                    <Link to="/Nosotros">
                        <div className={styles.menuButton}>nosotros</div>
                    </Link>
                </li>
                <li>
                    <Link to="/Contact">
                        <div className={styles.menuButton}>Contacto</div>
                    </Link>
                </li>
                <li>
                    <Link to="/Cart">
                        <div className={styles.menuButton}><HiOutlineShoppingCart/>( {totalProductsQuantity} )</div>
                    </Link>
                </li>
                <li>
                    <Link to="/newpost">
                        <div className={styles.menuButton}>Subir Producto</div>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;