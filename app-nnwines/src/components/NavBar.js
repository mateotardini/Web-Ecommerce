import React, { useContext , useState} from 'react';
import { Link } from "react-router-dom";

import { HiOutlineShoppingCart } from "react-icons/hi";

import styles from "../css/NavBar.module.css";

import { CartContext } from '../contexts/ShoppingCartContext';
import ShoppingCart  from './ShoppingCart.js';

function NavBar(){
    const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart, handleCloseCart] = useContext(CartContext);
    
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
                    <button className={styles.menuButton} onClick={()=>{handleOpenCart()}}>
                        <HiOutlineShoppingCart/>( {totalProductsQuantity} )
                    </button>
                </li>
                <li>
                    <Link to="/newpost">
                        <div className={styles.menuButton}>Subir Producto</div>
                    </Link>
                </li>
            </ul>
            <ShoppingCart />
        </div>
    );
}

export default NavBar;