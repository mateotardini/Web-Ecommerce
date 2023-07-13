import React, { useState, useRef } from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
/*CSS*/
import styles from '../css/ProductEdit.module.css';

function ProductEdit(props) {
  const [data, setData] = useState({
    id: props.id,
    ProductName: props.ProductName,
    image: props.Image,
    price: props.Price,
    size: props.Size,
    variety: props.Variety,
    description: props.Description
  });

  const editAPIURL = `https://nn-wines.onrender.com/api/database/post/${props.id}`;

  const fetchAPI = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('ProductName', editedProductName);

    if (editedImage) {
      formData.append('image', editedImage);
    } else {
      formData.append('image', data.image);
    }

    formData.append('price', editedPrice);
    formData.append('size', data.size);
    formData.append('description', editedDescription);
    formData.append('variety', editedVariety || data.variety); // Append edited variety or use the current value

    try {
      const res = await fetch(editAPIURL, {
        method: 'PATCH',
        body: formData,
      });

      if (res.ok) {
        console.log('Producto actualizado correctamente');
        window.location.reload();
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

        setTimeout(function () {
          window.location.reload();
        });
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error de red al eliminar el producto', error);
    }
  };

  const [editing, setEditing] = useState(false);
  const [editedProductName, setEditedProductName] = useState(props.ProductName);
  const [editedPrice, setEditedPrice] = useState(props.Price);
  const [editedDescription, setEditedDescription] = useState(props.Description);
  const [editedImage, setEditedImage] = useState(null); // Estado para la imagen editada
  const [editedVariety, setEditedVariety] = useState(props.Variety); // State for edited variety with default value

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
      variety: editedVariety
    }));

    setEditing(false);
    await fetchAPI(event);
  };

  const confirmDelete = () => {
    const result = window.confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (result) {
      DeleteProduct(props.id);
    }
  };

  // Convertir el objeto Buffer a una cadena de caracteres en formato base64
  const base64String = Buffer.from(data.image).toString('base64');

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.row}>
          <h1 className={styles.productId}>{props.id}</h1>
          <img
            className={styles.productImage}
            src={editedImage ? URL.createObjectURL(editedImage) : `data:image/png;base64,${base64String}`}
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
                  <select
                    name="variety"
                    value={editedVariety || data.variety}
                    onChange={(e) => setEditedVariety(e.target.value)}
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditedImage(e.target.files[0])}
                  />
                  <button className='button-borderline' onClick={() => confirmDelete()}>Eliminar</button>
                  <button className='button-borderline inverse' type="submit">Guardar</button>
                </form>
              </div>
            ) : (
              <div className='row'>
                <h1 className={styles.productName}>{props.ProductName}</h1>
                <h2 className={styles.productPrice}>$ {props.Price}</h2>
                <p className={styles.productVariety}>Variedad: {props.Variety}</p>
                <p className={styles.productDescription}>{props.Description}</p>
                <button className='button-borderline' onClick={enableEditing}>
                  <HiOutlinePencilAlt />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;