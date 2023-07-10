import React, { useState, useRef } from 'react';
/*CSS*/
import styles from '../css/ProductEdit.module.css';

function ProductEdit(props) {
  const [data, setData] = useState({
    id: props.id,
    ProductName: props.ProductName,
    image: props.Image,
    price: props.Price,
    size: props.Size,
    description: props.Description
  });

  const editAPIURL = `https://nn-wines.onrender.com/api/database/post/${props.id}`;

  const fetchAPI = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('ProductName', editedProductName);
    formData.append('image', data.image); // Include the image in the FormData
    formData.append('price', editedPrice);
    formData.append('size', data.size);
    formData.append('description', editedDescription);

    try {
      const res = await fetch(editAPIURL, {
        method: 'PATCH',
        body: formData,
      });

      if (res.ok) {
        console.log('Producto actualizado correctamente');
        window.location.reload(); // Reload the page
      } else {
        console.error('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error de red al actualizar el producto', error);
    }
  };

  const DeleteProduct = async (id) => {
    const apiURL = `https://nn-wines.onrender.com/api/database/delete/${id}`;

    try {
      const response = await fetch(apiURL, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Producto eliminado correctamente');
        window.location.reload(); // Recargar la página
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error de red al eliminar el producto', error);
    }
  };

  const base64String = props.Image ? Buffer.from(props.Image).toString('base64') : '';

  const [editing, setEditing] = useState(false);
  const [editedProductName, setEditedProductName] = useState(props.ProductName);
  const [editedPrice, setEditedPrice] = useState(props.Price);
  const [editedDescription, setEditedDescription] = useState(props.Description);
  const [editedImage, setEditedImage] = useState(null); // Estado para la imagen editada

  const productNameInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const enableEditing = () => {
    setEditing(true);
  };

  const saveChanges = async (event) => {
    event.preventDefault();

    setData((data) => ({
      ...data,
      ProductName: editedProductName,
      price: editedPrice,
      description: editedDescription,
      image: editedImage,
    }));

    setEditing(false);
    await fetchAPI(event);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.row}>
          <h1 className={styles.productId}>{props.id}</h1>
          <img
            className={styles.productImage}
            src={`data:image/png;base64,${base64String}`}
            alt={'Imagen de ' + props.ProductName}
          />

          <div className={styles.productDataBox}>
            {editing ? (
              <div className='row'>
                <form onSubmit={saveChanges}>
                  <input
                    name="ProductName"
                    type="text"
                    value={editedProductName}
                    onChange={(e) => setEditedProductName(e.target.value)}
                    ref={productNameInputRef}
                  />
                  <input
                    name="price"
                    type="text"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    ref={priceInputRef}
                  />
                  <textarea
                    name="description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    ref={descriptionInputRef}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditedImage(URL.createObjectURL(e.target.files[0]))}
                  />
                  <button className='button-borderline' onClick={() => DeleteProduct(props.id)}>Eliminar</button>
                  <button className='button-borderline inverse' type="submit">Guardar</button>
                </form>
              </div>
            ) : (
              <div className='row'>
                <h1 className={styles.productName}>{props.ProductName}</h1>
                <h2 className={styles.productPrice}>$ {props.Price}</h2>
                <p className={styles.productDescription}>{props.Description}</p>
                <button className='button-borderline' onClick={enableEditing}>Editar</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;