import React from 'react';
import { Link } from 'react-router-dom';
/*CSS*/
import styles from "../css/Footer.module.css";
/*Iconos*/
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
/*Componentes*/
import Linea from './Linea';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row" style={{ "align-items": "flex-start" }}>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <img className={styles.logo}
              src={require(`../images/NN WINES LOGO.png`)}
              alt='Logo NN Wines'
            />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <h2>Nuestra tienda</h2>
            <Linea color="var(--primary-color)" grosor={5} longitud={60} />
            <ul className={styles.links}>
              <li><Link to="/Products">Productos</Link></li>
              <li><Link to="/Nosotros">Quienes Somos</Link></li>
              <li><Link to="/Como-Comprar">Como Comprar</Link></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <h2>Redes sociales</h2>
            <Linea color="var(--primary-color)" grosor={5} longitud={60} />
            <ul className={styles.links}>
              <li><a href="https://www.instagram.com/nnwines/"><FaFacebookF /> Facebook</a></li>
              <li><a href="https://www.instagram.com/nnwines/"><FaInstagram /> Instagram</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <h2>Contacto</h2>
            <Linea color="var(--primary-color)" grosor={5} longitud={60} />
            <ul className={styles.links}>
              <li><FaMapMarkerAlt /> Dirección: 123 Calle Falsa, Ciudad, País</li>
              <li><FaPhoneAlt /> Teléfono: <a href="https://wa.me/1234567890">+1234567890 (WhatsApp)</a></li>
              <li><FaEnvelope /> Email: <a href="mailto:info@nnwines.com">info@nnwines.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.colMd12}>
              <p>© 2023 Todos los derechos reservados. Tienda NNWines.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;