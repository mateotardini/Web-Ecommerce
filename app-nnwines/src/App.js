import React from 'react';
import './App.css';

/*Componentes */
import Home from './pages/Home';
import Products from './pages/Products';
import Details from './pages/Details';
import Nosotros from './pages/Nosotros';
import ComoComprar from './pages/ComoComprar';
import Create from './pages/Create';

import NavBar from './components/NavBar';

import { ShoppingCartProvider } from './contexts/ShoppingCartContext';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
  <div className='App'>
    <ShoppingCartProvider>
    <NavBar />
    <div className='contenedor-principal'>
      
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Products/" element={<Products/>} />
          <Route path="/Details/:Id" element={<Details/>}/>
          <Route path="/Nosotros/" element={<Nosotros/>} />
          <Route path="/Como-Comprar/" element={<ComoComprar/>} />
          <Route path="/NewPost/" element={<Create/>} />
        </Routes>
      
    </div>
    </ShoppingCartProvider>
  </div>
  );
}

export default App;