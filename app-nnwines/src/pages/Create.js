import React, { useState } from 'react';

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
    console.log(data);

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

  return (
    <div>
      <h1>Subir Nuevo Producto</h1>
      <form onSubmit={fetchAPI} className="row">
        <input
          name="id"
          placeholder='id'
          onChange={handleInputChange}
          type="number" required />
        <input
          name="ProductName"
          placeholder='Nombre del Producto'
          onChange={handleInputChange}
          type="text" required />
        <input
          name="image"
          type="file"
          placeholder='Imagen'
          onChange={handleInputChange}
          required />
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
          required />

        <button type='submit'>
          Subir Producto
        </button>
      </form>
    </div>
  );
}

export default Create;