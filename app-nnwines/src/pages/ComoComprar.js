import React from 'react';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
/*Componentes*/
import styles from "../css/ComoComprar.module.css";
import Footer from "../components/Footer";

function ComoComprar() {
  return (
    <div>
      <div class="hero-section">
        <img class="logoTittle" src={require(`../images/NN WINES LOGO.png`)} alt='Logo NN Wines' />
        <div class="overlay-text">
          <h2><strong>NN Wines</strong></h2>
          <h1>
            <strong>
              De la Bodega
              <br />
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

              <p>¡En nuestra increíble tienda, puedes agregar todos los productos que desees al carrito de compras y enviar tu pedido fácilmente a través de WhatsApp! Estamos aquí para ayudarte en cada paso del proceso.</p>
              <p>Antes de enviar tu pedido, te recomendamos que revises cuidadosamente los productos que has agregado al carrito y te asegures de tener las cantidades correctas. Queremos asegurarnos de que obtengas exactamente lo que deseas.</p>
              <p>Recuerda que el pago se realiza directamente con nuestros amigables vendedores, quienes te proporcionarán los medios de pago disponibles. Queremos facilitarte al máximo el proceso de compra.</p>
              <p>Si en algún momento tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos a través de nuestras redes sociales o utilizando los datos de contacto que encontrarás en la sección de Contacto. Estaremos encantados de ayudarte en todo lo que necesites.</p>
              <p>¡Gracias por elegir nuestra tienda! ¡Esperamos que disfrutes de tu experiencia de compra y encuentres productos increíbles!</p>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className={styles.sideBox}>
                <h2>¿Cómo funciona el carrito de compras?</h2>
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
      <Footer />
    </div>
  );
}

export default ComoComprar;