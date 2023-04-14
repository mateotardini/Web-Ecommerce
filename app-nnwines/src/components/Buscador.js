import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../css/Buscador.module.css";

function Buscador() {
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState(""); // Nuevo estado para el precio mínimo
  const [maxPrice, setMaxPrice] = useState(""); // Nuevo estado para el precio máximo
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Pasar los valores de búsqueda al componente padre (Products) mediante una función de callback
    // Puedes modificar la función handleSearch de acuerdo a tus necesidades
    // Aquí se pasa searchText, minPrice y maxPrice al componente padre
    navigate(`/products?search=${searchText}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }

  return (
    <div className={styles.contenedorBuscador}>
      <form onSubmit={handleSearch}>
        <input className={styles.inputBuscador}
          name="productName"
          placeholder="Nombre de Producto"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}>
        </input>
        <input className={styles.inputBuscador}
          name="minPrice"
          placeholder="Desde"
          type="text"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}>
        </input>
        <input className={styles.inputBuscador}
          name="maxPrice"
          placeholder="Hasta"
          type="text"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}>
        </input>
        <button className={styles.buttonBuscador} type='submit'>Buscar</button>
      </form>
    </div>
  );
}

export default Buscador;