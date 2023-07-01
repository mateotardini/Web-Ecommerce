import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/*Componentes*/
import ProductHome from '../components/ProductHome';
import Footer from '../components/Footer';
import Buscador from '../components/Buscador';
import Linea from '../components/Linea';

function Products() {
  /*States*/
  const [data, setData] = useState([]);
  /*States Busqueda y Filtros*/
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedVariety, setSelectedVariety] = useState([]);

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
    //const searchQuery = encodeURIComponent(searchTerm);
    //window.location = `/products?q=${searchQuery}`;
    setSearchTerm(searchTerm);
  };

  //Seteo de filtro mediante las diferentes medidas.
  const productSizes = [...new Set(data.map(dataProduct => dataProduct.Size))];
  const handleSizeFilter = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(selectedSize => selectedSize !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const productVariety = [... new Set(data.map(dataProduct => dataProduct.Variety))];
  const handleVarietyFilter = (variety) => {
    if (selectedVariety.includes(variety)) {
      setSelectedSizes(selectedVariety.filter(selectedVariety => selectedVariety !== variety));
    } else {
      setSelectedSizes([...selectedVariety, variety]);
    }
  };

  //Hace un listado de los productos filtrados tanto por tamaño como por nombre
  let filteredData = data;
  if (selectedSizes.length > 0) {
    filteredData = data.filter(dataProduct => selectedSizes.includes(dataProduct.Size));
  }
  if (selectedVariety.length > 0) {
    filteredData = data.filter(dataProduct => selectedVariety.includes(dataProduct.Variety));
  }
  if (searchTerm != "") {
    filteredData = filteredData.filter(dataProduct => dataProduct.ProductName.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  return (
    <div>
      <div class="hero-section">
        <img class="logoTittle" src={require(`../images/NN WINES LOGO.png`)} alt='Logo NN Wines' />
        <div class="overlay-text">
          <h2><strong>NN Wines</strong></h2>
          <h1>
            <strong>
              DE LA BODEGA
              <br />
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
          > {size} </button>
        ))}
      </div>
      <div className="variety-filters">
        {productVariety.map(variety => (
          <button
            key={variety}
            className={`variety-filter ${selectedVariety.includes(variety) ? 'selected' : ''}`}
            onClick={() => handleVarietyFilter(variety)}
          > {variety} </button>
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