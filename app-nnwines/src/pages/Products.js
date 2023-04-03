import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/*Componentes */
import ProductHome from '../components/ProductHome';
import Buscador from '../components/Buscador';
import Footer from '../components/Footer';

function Products(){

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

      const location = useLocation();

      function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
  
      const query = useQuery();
      const search = query.get("search");

    return(
        <div>
          <div className="overlay-Text">
            <h1>
              Privileged Wine
              <h3>Products</h3>
            </h1>
            <button className="button-borderline" onclick="document.getElementById('first-Section').scrollIntoView();">VER MÁS</button>
          </div>   
          <img className='principal-home-image'
          src={require(`../images/NNWines-florent-2.jpg`)}
          alt={"Imagen Portada NN Wines"}/>
          <Buscador/>
          <div className='grid'>
            {data.map((dataProduct) => {
                return <ProductHome 
                    key={dataProduct.id}
                    id={dataProduct.id}
                    productName={dataProduct.ProductName}
                    price={dataProduct.Price}
                    size={dataProduct.Size}
                    description={dataProduct.Description}/>
                }
            )}
          </div>
          <Footer/>
        </div>
    );
}

export default Products;