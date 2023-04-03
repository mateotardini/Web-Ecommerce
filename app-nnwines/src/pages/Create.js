import React, { useState } from 'react';

function Create(){

  /*//////Request POST//////*/
    const [data, setData] = useState({
        ProductName: "",
        image: "",
        price: "",
        size: "",
        description: ""
    });

    const handleInputChange = (event) => {
      setData({
          ...data,
          [event.target.name] : event.target.value
      })
    }

    const apiURL = "/api/database/post";

    let fetchAPI = async(event) =>{
      event.preventDefault()
      console.log(data);
      const res = await fetch(apiURL, 
      {
        method: 'POST', // or 'PUT'
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(data),}
      );
      return res;
    }
    /*//////////////////////*/


    return(
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
                type="text" required/>
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
                required/>

              <button type='submit'>
                Subir Producto
              </button>
            </form>
            
        </div>
    );
}

export default Create;