import React, { useState, useRef } from 'react';

//CSS
import styles from '../css/ProductEdit.module.css';

function ProductEdit(props) {
  // Convertir el objeto Buffer a una cadena de caracteres en formato base64
  const base64String = Buffer.from(props.Image).toString('base64');

  // Estado para controlar si se está editando el texto o no
  const [editing, setEditing] = useState(false);

  // Estado para controlar los valores editados
  const [editedProductName, setEditedProductName] = useState(props.ProductName);
  const [editedPrice, setEditedPrice] = useState(props.Price);
  const [editedDescription, setEditedDescription] = useState(props.Description);

  // Referencia a los campos de entrada de texto
  const productNameInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  // Función para activar la edición de texto
  const enableEditing = () => {
    setEditing(true);
  };

  // Función para guardar los cambios realizados
  const saveChanges = (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica para guardar los cambios en tu aplicación
    // Por ahora, simplemente desactivamos la edición
    setEditing(false);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.row}>
          <h1 className={styles.productId}>{props.id}</h1>
          <img
            className={styles.productImage}
            src={`data:image/png;base64,${base64String}`} // Cambiar a 'data:image/jpeg;base64,' si el servidor está enviando la imagen en formato JPEG
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