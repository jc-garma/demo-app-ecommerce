import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Inicio } from './inicio/Inicio';
import { ProductosLista } from './productos/ProductosLista';

export const Paginas = () => {
  return (
    <section>
      <Switch>
        <Route path="/" exact component={Inicio} />
        <Route path="/productos" exact component={ProductosLista} />
      </Switch>
    </section>
  );
};
