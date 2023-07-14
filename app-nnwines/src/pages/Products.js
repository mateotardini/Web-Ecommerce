import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/*Componentes*/
import ProductHome from '../components/ProductHome';
import Footer from '../components/Footer';
import Buscador from '../components/Buscador';
import Linea from '../components/Linea';
import LoadingDots from '../components/LoadingDots';

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
    setSelectedSizes([]);
    setSelectedVariety([]);
  };

  const filteredData = showAll
    ? data
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
          <button class="button-borderline inverse" onClick={() => window.location.href = "#first-Section"}>SHOP NOW</button>
        </div>
      </div>

      <h2 className='color-black'>
        <strong>Todos los Productos</strong>
        <br></br>
        <Linea color="var(--primary-color)" grosor={5} longitud={60} />
        <p>Encontra el Tuyo</p>
      </h2>
      {loading ? (
        <LoadingDots />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className='filterSection'>
            <Buscador handleSearch={handleSearch} />

            <button className="show-all-button button-borderline inverse" onClick={handleShowAll}>
              Mostrar todos los vinos
            </button>

            <div className="variety-filters row toogleFilter">
              <p><strong>Categorias</strong></p>
              {Array.from(new Set(data.map(dataProduct => dataProduct.Variety))).map(variety => (
                <label key={variety} className={`variety-filter ${selectedVariety.includes(variety) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedVariety.includes(variety)}
                    onChange={() => handleToggle(variety, selectedVariety, setSelectedVariety)}
                  />
                  {variety}
                </label>
              ))}
            </div>

            <div className="size-filters row toogleFilter">
              <p><strong>Presentación</strong></p>
              {Array.from(new Set(data.map(dataProduct => dataProduct.Size))).map(size => (
                <label key={size} className={`size-filter ${selectedSizes.includes(size) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleToggle(size, selectedSizes, setSelectedSizes)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div className="grid" id='first-Section'>
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
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Products;