import React, { useState } from 'react';

function Buscador({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="contenedorBuscador">
      <form onSubmit={handleSubmit}>
        <input
          className='button-borderline'
          type="text"
          placeholder="Buscar vino..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className='button-borderline inverse'>Buscar</button>
      </form>
    </div>
  );
}

export default Buscador;