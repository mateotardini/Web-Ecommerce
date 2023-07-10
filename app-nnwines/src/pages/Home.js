import React, { useEffect, useState } from 'react';
/*Componentes*/
import ProductHome from '../components/ProductHome';
import Linea from '../components/Linea';
import ImageButton from '../components/ImageButton';
import Footer from '../components/Footer';

function Home() {
  ///////Request GET//////
  let results = "";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiURL = "https://nn-wines.onrender.com/api/database";
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
        results = JSON.parse(json);
        setLoading(false);
        setData(results);
        return results;
      }).catch(err => {
        console.log("fetch error: " + err);
        setLoading(false);
      })
  }, []);
  ///////////////////////


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

      <div>
        <ImageButton />
      </div>

      <h2 className='color-black'>
        <strong>Productos</strong>
        <br></br>
        <Linea color="var(--primary-color)" grosor={5} longitud={60} />
        <p>Productos Destacados</p>
      </h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
      <div className='grid'>
        {data.map((item) => {
          return <ProductHome
            key={item.id}
            id={item.id}
            ProductName={item.ProductName}
            Price={item.Price}
            Size={item.Size}
            Description={item.Description}
            Image={item.Image}
          />
        })}
      </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;