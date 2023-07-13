import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/*Componentes*/
import ProductHome from '../components/ProductHome';
import Footer from '../components/Footer';
import Buscador from '../components/Buscador';
import Linea from '../components/Linea';

const apiURL = "https://nn-wines.onrender.com/api/database";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedVariety, setSelectedVariety] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to track if "Show All" button is clicked

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(apiURL);
        const results = await res.json();
        if (mounted) {
          setData(JSON.parse(results));
          setLoading(false);
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
    setSearchTerm(searchTerm);
  };

  const handleToggle = (value, selectedState, setSelectedState) => {
    if (selectedState.includes(value)) {
      setSelectedState(selectedState.filter((selectedValue) => selectedValue !== value));
    } else {
      setSelectedState([...selectedState, value]);
    }
  };

  const handleShowAll = () => {
    setShowAll(true);
    setSelectedSizes([]); // Restablece los tamaños seleccionados a un array vacío
    setSelectedVariety([]); // Restablece las variedades seleccionadas a un array vacío
  };

  const filteredData = showAll
    ? data // If "Show All" is clicked, show all data without any filters
    : data.filter((dataProduct) =>
        (selectedSizes.length === 0 || selectedSizes.includes(dataProduct.Size)) &&
        (selectedVariety.length === 0 || selectedVariety.includes(dataProduct.Variety)) &&
        (searchTerm === "" || dataProduct.ProductName.toLowerCase().includes(searchTerm.toLowerCase()))
      );

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
          <h3><strong>Encontrá y comprá Vino Premium!</strong></h3>
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
        {Array.from(new Set(data.map(dataProduct => dataProduct.Size))).map(size => (
          <label key={size} className={`size-filter ${selectedSizes.includes(size) ? 'selected' : ''}`}>
            {size}
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() => handleToggle(size, selectedSizes, setSelectedSizes)}
            />
          </label>
        ))}
      </div>
      <div className="variety-filters">
        {Array.from(new Set(data.map(dataProduct => dataProduct.Variety))).map(variety => (
          <label key={variety} className={`variety-filter ${selectedVariety.includes(variety) ? 'selected' : ''}`}>
            {variety}
            <input
              type="checkbox"
              checked={selectedVariety.includes(variety)}
              onChange={() => handleToggle(variety, selectedVariety, setSelectedVariety)}
            />
          </label>
        ))}
      </div>
      <button className="show-all-button" onClick={handleShowAll}>
        Mostrar todos los vinos
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="grid">
            {filteredData.map((dataProduct) => (
              <ProductHome
                key={dataProduct.id}
                id={dataProduct.id}
                ProductName={dataProduct.ProductName}
                Price={dataProduct.Price}
                Size={dataProduct.Size}
                Variety={dataProduct.Variety}
                Description={dataProduct.Description}
                Image={dataProduct.Image}
              />
            ))}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default Products;