import React, { useContext } from 'react';
import './App.css';
/*Paginas*/
import Home from './pages/Home';
import Products from './pages/Products';
import Details from './pages/Details';
import Error404 from './pages/404';
import ComoComprar from './pages/ComoComprar';
import Create from './pages/Create';
import Login from './pages/Login';
/*Componentes*/
import NavBar from './components/NavBar';
/*Contexts*/
import { ShoppingCartProvider, CartContext } from './contexts/ShoppingCartContext';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
/*Rutas*/
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      <ShoppingCartProvider>
        <AuthProvider>
          <NavBar />
          <div className='contenedor-principal'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Products/" element={<Products />} />
              <Route path="/Details/:Id" element={<Details />} />
              <Route path="/Como-Comprar/" element={<ComoComprar />} />
              <Route path="/QqGEDmDXqXaQ/" element={<Create />} />
              <Route path="/Login/" element={<Login />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </AuthProvider>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;