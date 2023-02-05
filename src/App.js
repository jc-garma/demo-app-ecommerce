import React from 'react';
//import './App.css';
import { Header } from './componentes/header/Header';
import { ProductosLista } from './componentes/productos/ProductosLista';
import { Carrito } from './componentes/carrito/Carrito';
import "boxicons";
import { BrowserRouter as Router } from 'react-router-dom';
import { Paginas } from './componentes/Paginas';
import { DataProvider } from './context/DataProvider';

//  Function component, Simple component

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Header />
          <Carrito />
          <Paginas />
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
