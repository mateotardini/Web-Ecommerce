import React from 'react';
import Footer from '../components/Footer';

function Error404() {
  return (
    <div>
      <h1>Error 404 - Página no encontrada</h1>
      <p>
        Lo sentimos, la página que estás buscando no se encuentra disponible.
      </p>
      <Footer />
    </div>
  );
}

export default Error404;