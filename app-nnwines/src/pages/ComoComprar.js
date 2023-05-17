import React from 'react';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import styles from "../css/ComoComprar.module.css";
import Footer from "../components/Footer";

function ComoComprar() {
  return (
    <div>
      <div class="hero-section">
        <img class="logoTittle" src={require(`../images/NN WINES LOGO.png`)} alt='Logo NN Wines'/>
        <div class="overlay-text">
          <h2><strong>NN Wines</strong></h2>
          <h1>
            <strong>
              De la Bodega
              <br/>
              A tu Casa
            </strong>
          </h1>
          <h3><strong>Encuentra y compra Vino Premium!</strong></h3>
          <button class="button-borderline inverse" onclick="document.getElementById('first-Section').scrollIntoView();">SHOP NOW</button>
        </div>
      </div>

      <section className={styles.comoComprar}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <h2>¿Cómo comprar en nuestra tienda?</h2>
            <p>En nuestra tienda podrás agregar los productos que desees al carrito de compras y enviar tu pedido mediante WhatsApp. El pago lo realizarás directamente con el vendedor mediante los medios que él proporcione.</p>
            <p>Recuerda revisar bien los productos que agregas al carrito y las cantidades antes de enviar tu pedido. Si tienes alguna duda, puedes contactarnos mediante nuestras redes sociales o mediante los datos de contacto que encontrarás en la sección de Contacto.</p>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className={styles.sideBox}>
              <h3>¿Cómo funciona el carrito de compras?</h3>
              <p>El carrito de compras funciona de la siguiente manera:</p>
              <ul>
                <li><FaShoppingCart /> Selecciona los productos que desees y agrégalo al carrito de compras.</li>
                <li><FaShoppingCart /> Verifica que los productos y las cantidades sean las correctas en el carrito de compras.</li>
                <li><FaWhatsapp /> Envíanos tu pedido mediante WhatsApp.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
}

export default ComoComprar;