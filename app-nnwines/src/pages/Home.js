import React, { useEffect, useState } from 'react';

//Components
import ProductHome from '../components/ProductHome';
import Linea from '../components/Linea';
import ImageButton from '../components/ImageButton';
import Footer from '../components/Footer';

function Home(){;

  ///////Request GET//////
    let results = "";

    const [data, setData] = useState([]);

    const apiURL = "/api/database"; 
    let fetchAPI = async() =>{
      const res = await fetch(apiURL);
      return res;
    }

    useEffect(() =>{
      fetchAPI()
      .then(res => {
        return res.json()
      })
      .then(json => {
        results = JSON.parse(json);

        setData(results);
        return results;
      }).catch( err => {
        console.log("fetch error" + err);
      })
    }, []);
  ///////////////////////

  
    return(
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
          <h3><strong>Encuentra y compra Vino Premium!</strong></h3>
          <button class="button-borderline inverse" onclick="document.getElementById('first-Section').scrollIntoView();">SHOP NOW</button>
        </div>
      </div>

      <div>
        <ImageButton/>
      </div>

      <h2 className='color-black'>
         <strong>Productos</strong>
         <br></br>
         <Linea color="var(--primary-color)" grosor={5} longitud={60} />
         <p>Productos Destacados</p>
      </h2>
      
      
      <div className='grid'>
        {data.map((dataProduct) => {
          return <ProductHome 
            key={dataProduct.id}
            id={dataProduct.id}
            ProductName={dataProduct.ProductName}
            Price={dataProduct.Price}
            Size={dataProduct.Size}
            Description={dataProduct.Description}
            Image={dataProduct.Image}
          />
          })}
      </div>
      
      <Footer/>
    </div>
    );
}

export default Home;