import React from 'react';
import './App.css';

/*Componentes */
import Home from './pages/Home';
import Products from './pages/Products';
import Details from './pages/Details';
import Nosotros from './pages/Nosotros';
import Create from './pages/Create';
import Cart from './pages/Cart';

import NavBar from './components/NavBar';

import { ShoppingCartProvider } from './contexts/ShoppingCartContext';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
  <div className='App'>
    <div className='contenedor-principal'>
      <ShoppingCartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Products/" element={<Products/>} />
          <Route path="/Details/:propiedadId" element={<Details/>}/>
          <Route path="/Nosotros/" element={<Nosotros/>} />
          <Route path="/NewPost/" element={<Create/>} />
          <Route path="/Cart/" element={<Cart/>} />
        </Routes>
      </ShoppingCartProvider>
    </div>
  </div>
  );
}

export default App;