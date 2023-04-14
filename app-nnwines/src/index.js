import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import ScrollToTop from "./components/scrollToTop";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
