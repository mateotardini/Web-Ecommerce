import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductHome from '../components/ProductHome';
import Footer from '../components/Footer';
import Buscador from '../components/Buscador';

function Products() {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const apiURL = "/api/database";
  let fetchAPI = async () => {
    const res = await fetch(apiURL);
    return res;
  }

  useEffect(() => {
    fetchAPI()
      .then(res => {
        return res.json()
      })
      .then(json => {
        const results = JSON.parse(json);
        setData(results);
        setFilteredProducts(results); // Actualizar los productos filtrados con los datos iniciales
        return results;
      }).catch(err => {
        console.log("fetch error" + err);
      })
  }, []);

  return (
    <div>
      <img className="logoTittle"
            src={require(`../images/NN WINE BLANCO.png`)}
            alt='Logo NN Wines'/>
      <div className="overlay-Text">
          <h2><strong>Privileged Wine</strong></h2>
          <h1>
            <strong>Wine Collection</strong>
          </h1>
          <h3><strong>Find & Buy Premium Fine Wines Here!</strong></h3>
        <button className="button-borderline inverse" 
          onclick="document.getElementById('first-Section').scrollIntoView();">SHOP NOW</button>
      </div>   


      <img className='principal-home-image'
        src={require(`../images/NNWines-florent-2.jpg`)}
        alt={"Imagen Portada NN Wines"} />
      <Buscador/>
      <div className='grid'>
        {filteredProducts.map((dataProduct) => { // Usar los productos filtrados en lugar de los datos originales
          return <ProductHome
            key={dataProduct.id}
            id={dataProduct.id}
            ProductName={dataProduct.ProductName}
            Price={dataProduct.Price}
            Size={dataProduct.Size}
            Description={dataProduct.Description} />
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Products;