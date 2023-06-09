import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductHome from '../components/ProductHome';
import Footer from '../components/Footer';
import Buscador from '../components/Buscador';
import Linea from '../components/Linea';

function Products() {
  const [data, setData] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const location = useLocation();

  const apiURL = "https://nn-wines.onrender.com/api/database";
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(apiURL);
        const json = await res.json();
        const results = JSON.parse(json);
        if (mounted) {
          setData(results);
        }
      } catch (err) {
        console.log("fetch error: " + err);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = (searchTerm) => {
    const searchQuery = encodeURIComponent(searchTerm);
    window.location = `/products?q=${searchQuery}`;
  };

  const productSizes = [...new Set(data.map(dataProduct => dataProduct.Size))];

  const handleSizeFilter = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(selectedSize => selectedSize !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  let filteredData = data;
  if (selectedSizes.length > 0) {
    filteredData = data.filter(dataProduct => selectedSizes.includes(dataProduct.Size));
  }

  return (
    <div>
      
      <div class="hero-section">
        <img class="logoTittle" src={require(`../images/NN WINES LOGO.png`)} alt='Logo NN Wines'/>
        <div class="overlay-text">
          <h2><strong>NN Wines</strong></h2>
          <h1>
            <strong>
              DE LA BODEGA
              <br/>
              A TU CASA
            </strong>
          </h1>
          <h3><strong>ENCONTRÁ Y COMPRÁ TU VINO PREMIUM</strong></h3>
          <button class="button-borderline inverse" onclick="document.getElementById('first-Section').scrollIntoView();">SHOP NOW</button>
        </div>
      </div>


      <h2 className='color-black'>
         <strong>Todos los Productos</strong>
         <br></br>
         <Linea color="var(--primary-color)" grosor={5} longitud={60} />
         <p>Encontra el Tuyo</p>
      </h2>

      <Buscador handleSearch={handleSearch} />
      <div className="size-filters">
        {productSizes.map(size => (
          <button
            key={size}
            className={`size-filter ${selectedSizes.includes(size) ? 'selected' : ''}`}
            onClick={() => handleSizeFilter(size)}
          >
            {size}
          </button>
        ))}
      </div>
      
      <div className='grid'>
        {filteredData.map((dataProduct) => (
          <ProductHome
            key={dataProduct.id}
            id={dataProduct.id}
            ProductName={dataProduct.ProductName}
            Price={dataProduct.Price}
            Size={dataProduct.Size}
            Description={dataProduct.Description}
            Image={dataProduct.Image}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Products;