import React, { useState, useEffect } from 'react';
import styles from '../css/ProductEdit.module.css';
import Footer from '../components/Footer';
import ProductEdit from '../components/ProductEdit';
import LoadingDots from '../components/LoadingDots';

function Create() {
  const [data, setData] = useState({
    ProductName: "",
    image: "",
    price: "",
    size: "",
    description: "",
    variety: ""
  });

  // Estado adicional para el preview de la imagen
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image') {
      const file = files[0];
      // Crear una URL del objeto File para el preview
      const imageURL = URL.createObjectURL(file);
      setData({
        ...data,
        image: file
      });
      setImagePreview(imageURL); // Establecer la URL del preview
    } else {
      setData({
        ...data,
        [name]: value
      });
    }
  }

  const apiURL = "https://nn-wines.onrender.com/api/database/post";

  let fetchAPI = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('ProductName', data.ProductName);
    formData.append('image', data.image);
    formData.append('price', data.price);
    formData.append('size', data.size);
    formData.append('variety', data.variety);
    formData.append('description', data.description);

    const res = await fetch(apiURL, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      console.log('Producto guardado correctamente');
      window.location.reload();
    } else {
      console.error('Error al guardar el producto');
    }

    return res;
  };

  let results = "";
  const [loading, setLoading] = useState(true);
  const [dataOLD, setDataOLD] = useState([]);

  const apiGetURL = "https://nn-wines.onrender.com/api/database";
  let fetchGetAPI = async () => {
    const res = await fetch(apiGetURL);
    return res;
  }

  useEffect(() => {
    fetchGetAPI()
      .then(res => res.json())
      .then(json => {
        results = JSON.parse(json);
        setDataOLD(results);
        setLoading(false);
        return results;
      }).catch(err => {
        console.log("fetch error" + err);
        setLoading(false);
      })
  }, []);

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

            {/* Mostrar el preview de la imagen */}
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
            )}
          </div>

          <div className={styles.productDataBox}>
            {/* Resto del código se mantiene igual */}
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
              <option value="Chardonnay">Chardonnay</option>
              <option value="Riesling">Riesling</option>
              <option value="Viognier">Viognier</option>
              <option value="Sauvignon Blanc">Sauvignon Blanc</option>
              <option value="Gewurztraminer">Gewurztraminer</option>
              <option value="Rosado">Rosado</option>
              <option value="Tinto">Tinto</option>
              <option value="Malbec">Malbec</option>
              <option value="Cabernet Sauv">Cabernet Sauv</option>
              <option value="Cabernet Franc">Cabernet Franc</option>
              <option value="Bonarda">Bonarda</option>
              <option value="Tannat">Tannat</option>
              <option value="Blend">Blend</option>
              <option value="Pinot Noir">Pinot Noir</option>
              <option value="Bequignol">Bequignol</option>
              <option value="Tempranillo">Tempranillo</option>
              <option value="Espumantes">Espumantes</option>
              <option value="Dulces">Dulces</option>
            </select>
          </div>
          <button type='submit'>
            Agregar Producto
          </button>
        </div>
      </form>

      {loading ? (
        <LoadingDots />
      ) : (
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
      )}

      <Footer />
    </div>
  );
}

export default Create;