import React, { useState, useEffect } from 'react';

//CSS
import styles from '../css/ProductEdit.module.css';

//Components
import Footer from '../components/Footer';
import ProductEdit from '../components/ProductEdit';

function Create() {

  /*//////Request POST//////*/
  const [data, setData] = useState({
    ProductName: "",
    image: "",
    price: "",
    size: "",
    description: ""
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image') {
      const file = files[0];
      setData({
        ...data,
        image: file
      });
      console.log(file);
    } else {
      setData({
        ...data,
        [name]: value
      });
    }
  }

  const apiURL = "/api/database/post";

  let fetchAPI = async (event) => {
    event.preventDefault()

    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('ProductName', data.ProductName);
    formData.append('image', data.image);
    formData.append('price', data.price);
    formData.append('size', data.size);
    formData.append('description', data.description);

    const res = await fetch(apiURL,
      {
        method: 'POST',
        body: formData,
      }
    );
    return res;
  }

  ///////Request GET//////
  let results = "";
  const [dataOLD, setDataOLD] = useState([]);

  const apiGetURL = "/api/database"; 
  let fetchGetAPI = async() =>{
    const res = await fetch(apiGetURL);
    return res;
  }

  useEffect(() =>{
    fetchGetAPI()
    .then(res => {
      return res.json()
    })
    .then(json => {
      results = JSON.parse(json);

      setDataOLD(results);
      return results;
    }).catch( err => {
      console.log("fetch error" + err);
    })
  }, []);
  ///////////////////////
  return (
    <div>
      <h1>Subir Nuevo Producto</h1>
      <form onSubmit={fetchAPI} className={styles.container}>
        <div className={styles.row}>
        <input
        name="id"
        placeholder='Codigo de Articulo'
        onChange={handleInputChange}
        type="number" required />

        <input
        name="image"
        type="file"
        placeholder='Imagen'
        onChange={handleInputChange}
        required />
        
        <div className={styles.productDataBox}>
        <input
        name="ProductName"
          placeholder='Nombre del Producto'
          onChange={handleInputChange}
          type="text" required />
          
        <input
        name="price"
          placeholder='Precio'
          onChange={handleInputChange}
          type="number" required />
          
        <input
        name="size"
          placeholder='Litraje'
          onChange={handleInputChange}
          type="number" required />
          
        <textarea
        name="description"
        placeholder='Descripción'
        onChange={handleInputChange}
        required 
        className={styles.productDescription}/>
        </div>
        <button type='submit'>
          Agregar Producto
        </button>
        </div>
      </form>

      <div>
        {dataOLD.map((dataProduct) => {
          return <ProductEdit 
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

      <Footer></Footer>
    </div>
  );
}

export default Create;