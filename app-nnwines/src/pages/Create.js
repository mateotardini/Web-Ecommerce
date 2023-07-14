import React, { useState, useEffect } from 'react';
/*CSS*/
import styles from '../css/ProductEdit.module.css';
/*Componentes*/
import Footer from '../components/Footer';
import ProductEdit from '../components/ProductEdit';

function Create() {
  /*//////Request POST//////*/
  const [data, setData] = useState({
    ProductName: "",
    image: "",
    price: "",
    size: "",
    description: "",
    variety: "" // Nueva propiedad para la variedad del producto
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

  // Convertir el objeto Buffer a una cadena de caracteres en formato base64
  const base64String = Buffer.from(data.image).toString('base64');

  const apiURL = "https://nn-wines.onrender.com/api/database/post";

  let fetchAPI = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('ProductName', data.ProductName);
    formData.append('image', data.image);
    formData.append('price', data.price);
    formData.append('size', data.size);
    formData.append('variety', data.variety); // Agregar la variedad al formData
    formData.append('description', data.description);

    const res = await fetch(apiURL, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      console.log('Producto guardado correctamente');
      window.location.reload(); // Recargar la página
    } else {
      console.error('Error al guardar el producto');
    }

    return res;
  };

  ///////Request GET//////
  let results = "";
  const [dataOLD, setDataOLD] = useState([]);

  const apiGetURL = "https://nn-wines.onrender.com/api/database";
  let fetchGetAPI = async () => {
    const res = await fetch(apiGetURL);
    return res;
  }

  useEffect(() => {
    fetchGetAPI()
      .then(res => {
        return res.json()
      })
      .then(json => {
        results = JSON.parse(json);
        setDataOLD(results);
        return results;
      }).catch(err => {
        console.log("fetch error" + err);
      })
  }, []);
  ///////////////////////
  return (
    <div>
      <h1>Subir Nuevo Producto</h1>
      <form onSubmit={fetchAPI} className={styles.container}>
        <div className={styles.row}>
          <div className="column">
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
          </div>

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
              className={styles.productDescription} />

            <select
              name="variety"
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar Variedad</option>
              <option value="Blanco">Blanco</option>
              <option value="Tinto">Tinto</option>
              <option value="Pinot Noir">Pinot Noir</option>
              <option value="Rosa">Rosa</option>
              <option value="Blend">Blend</option>
              <option value="Malbec">Malbec</option>
              <option value="Espumantes">Espumantes</option>
            </select>
          </div>
          <button type='submit'>
            Agregar Producto
          </button>
        </div>
      </form>

      <div>
        {dataOLD.map((item) => {
          return <ProductEdit
            key={item.id}
            id={item.id}
            ProductName={item.ProductName}
            Price={item.Price}
            Size={item.Size}
            Variety={item.Variety}
            Description={item.Description}
            Image={item.Image}
          />
        })}
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Create;