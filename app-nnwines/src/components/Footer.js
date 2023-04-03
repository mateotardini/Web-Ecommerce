import React from 'react';

function Footer(){

    return(
        <footer>
            <div className='row'>
                <div className='column'>
                    <h4>INFORMACION DE CONTACTO</h4>
                    <p>Arieta 2805, San Justo, Buenos Aires</p>
                    <p>(+54 9) 11 6942-1482</p>
                    <p>info@nnwines.com.ar</p>
                    <a href='https://www.facebook.com/jardin.elisen/?locale=es_LA'>Facebook</a>
                    <a href='https://www.instagram.com/jardin.elisen/'>Instagram</a>
                </div>
                <div className='column'>
                    <h4>PESTAÑAS</h4>
                    <div to="/Contact">
                        <div>Contacto</div>
                    </div>
                    <div to="/Products">
                        <div>Productos</div>
                    </div>
                </div>
            </div>
      </footer>
    );
};

export default Footer;