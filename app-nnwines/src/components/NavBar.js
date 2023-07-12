import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart,HiLogout,HiLogin,HiUpload,HiOutlineViewGrid,HiOutlineHome } from 'react-icons/hi';
import styles from '../css/NavBar.module.css';
import { CartContext } from '../contexts/ShoppingCartContext';
import { AuthContext } from '../contexts/AuthContext.js';
import ShoppingCart from './ShoppingCart.js';

function NavBar() {
    const { isAuthenticated, handleLogout } = useContext(AuthContext);
    const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart] = useContext(
        CartContext
    );

    const totalProductsQuantity = shoppingCart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    const handleLogoutClick = () => {
        handleLogout(); // Call the logout function from AuthContext
        // Additional cleanup or logic after logout if needed
    };

    return (
        <div className={styles.container}>
            <img
                className={styles.logo}
                src={require(`../images/NN WINES LOGO.png`)}
                alt="Logo NN Wines"
            />
            <ul className={styles.menuNavBar}>
                <li>
                    <Link to="/">
                        <div className={styles.menuButton}><HiOutlineHome/>  inicio</div>
                    </Link>
                </li>
                <li>
                    <Link to="/Products">
                        <div className={styles.menuButton}><HiOutlineViewGrid />  productos</div>
                    </Link>
                </li>
                <li>
                    <Link to="/Como-Comprar">
                        <div className={styles.menuButton}>cómo comprar</div>
                    </Link>
                </li>
                <li>
                    <button className={styles.menuButton} onClick={() => handleOpenCart()}>
                        <HiOutlineShoppingCart /> ({totalProductsQuantity})
                    </button>
                </li>

                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/QqGEDmDXqXaQ">
                                
                                <div className={styles.menuButton}><HiUpload />  Subir Producto</div>
                            </Link>
                        </li>
                        <li>
                            <button className={styles.menuButton} onClick={handleLogoutClick}>
                                <HiLogout /> 
                            </button>
                        </li>
                    </>
                ) : (
                    <Link to="/login">
                        <div className={styles.menuButton}><HiLogin/>  Iniciar Sesión</div>
                    </Link>
                )}

            </ul>
            <ShoppingCart />
        </div>
    );
}

export default NavBar;