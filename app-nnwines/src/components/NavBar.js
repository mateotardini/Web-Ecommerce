import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart, HiLogout, HiLogin, HiUpload, HiOutlineViewGrid, HiOutlineHome, HiOutlineInformationCircle, HiX, HiMenu } from 'react-icons/hi';
import styles from '../css/NavBar.module.css';
import { CartContext } from '../contexts/ShoppingCartContext';
import { AuthContext } from '../contexts/AuthContext.js';
import ShoppingCart from './ShoppingCart.js';

function NavBar() {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [shoppingCart, setShoppingCart, addToShoppingCart, removeToShoppingCart, openCart, handleOpenCart] = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const totalProductsQuantity = shoppingCart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const handleLogoutClick = () => {
    handleLogout();
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleGoToCart = () => {
    handleMenuClose();
    handleOpenCart();
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.hamburgerContainer} onClick={handleMenuToggle}>
        <HiMenu />
      </div>

      <div className={`${styles.container} ${menuOpen ? styles.menuOpen : ''}`}>
        <button className={styles.closeButton} onClick={handleMenuClose}>
          <HiX />
        </button>

        <Link to="/">
          <img className={styles.logo} src={require(`../images/NN WINES LOGO.png`)} alt="Logo NN Wines" />
        </Link>

        <ul className={styles.menuNavBar}>
          <li>
            <Link to="/">
              <div className={styles.menuButton}><HiOutlineHome /> inicio</div>
            </Link>
          </li>
          <li>
            <Link to="/Products">
              <div className={styles.menuButton}><HiOutlineViewGrid /> productos</div>
            </Link>
          </li>
          <li>
            <Link to="/Como-Comprar">
              <div className={styles.menuButton}><HiOutlineInformationCircle /> cómo comprar</div>
            </Link>
          </li>
          <li>
            <button className={styles.menuButton} onClick={handleGoToCart}>
              <HiOutlineShoppingCart /> ({totalProductsQuantity})
            </button>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/QqGEDmDXqXaQ">
                  <div className={styles.menuButton}><HiUpload /> Subir Producto</div>
                </Link>
              </li>
              <li>
                <button className={styles.menuButton} onClick={handleLogoutClick}>
                  <HiLogout /> Log Out
                </button>
              </li>
            </>
          ) : (
            <Link to="/login">
              <div className={styles.menuButton}><HiLogin /> Iniciar Sesión</div>
            </Link>
          )}
        </ul>
        <ShoppingCart />
      </div>
    </div>
  );
}

export default NavBar;