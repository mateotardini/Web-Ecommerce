import React, { useEffect, useState } from 'react';

/*Componentes */
import ProductHome from '../components/ProductHome';
import Linea from '../components/Linea';
import Footer from '../components/Footer';

function Home(){;

  /*//////Request GET//////*/
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
  /*//////////////////////*/

  
    return(
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
        src={require(`../images/NNWines-florent.jpg`)}
        alt={"Imagen Portada NN Wines"}/>
      <h2 className='color-black'>
         <strong>Best Seller</strong>
         <br></br>
         <Linea color="var(--primary-color)" grosor={5} longitud={60} />
         <p>Best Seller Product This Week!</p>
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