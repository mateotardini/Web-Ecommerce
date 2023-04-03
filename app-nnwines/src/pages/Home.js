import React, { useEffect, useState } from 'react';

/*Componentes */
import ProductHome from '../components/ProductHome';
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
        console.log(results);
        setData(results);
        return results;
      }).catch( err => {
        console.log("fetch error" + err);
      })
    }, []);
  /*//////////////////////*/

  
    return(
    <div>
      <div className="overlay-Text">
        <img className="logoTittle"
            src={require(`../images/NN WINE BLANCO.png`)}
            alt='Logo NN Wines'/>
          <h1>
            Privileged Wine
          <h3>Try Our Exlusive Wine Varieties.</h3>
        </h1>
        <button className="button-borderline" onclick="document.getElementById('first-Section').scrollIntoView();">VER MÁS</button>
      </div>   

      <img className='principal-home-image'
        src={require(`../images/NNWines-florent.jpg`)}
        alt={"Imagen Portada NN Wines"}/>
      <h1>
         Best Seller
      </h1>
      <p>Best Seller Product This Week!</p>
      <div className='grid'>
                {data.map((dataProduct) => {
                  return <ProductHome 
                    key={dataProduct.id}
                    id={dataProduct.id}
                    productName={dataProduct.ProductName}
                    price={dataProduct.Price}
                    size={dataProduct.Size}
                    description={dataProduct.Description}
                  />
                }
        )}
      </div>
      
      <Footer/>
    </div>
    );
}

export default Home;