import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Inicio } from './inicio/Inicio';
import { ProductosLista } from './productos/ProductosLista';
import { ProductosDetalles } from './productos/ProductosDetalles';

export const Paginas = () => {
  return (
    <section>
      <Switch>
        <Route path="/" exact component={Inicio} />
        <Route path="/productos" exact component={ProductosLista} />
        <Route path="/productos/:id" exact component={ProductosDetalles} />
      </Switch>
    </section>
  );
};
