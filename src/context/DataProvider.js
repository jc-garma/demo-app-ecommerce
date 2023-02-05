import React, { createContext, useState, useEffect } from "react";
import Data from "../Data.js";

export const DataContext = createContext(); //

export const DataProvider = (props) => {
  const [productos, setProductos] = useState([]);
  const [menu, setMenu] = useState(false);
  const [carrito, setCarrito] = useState([]); // cada vez que se cambia algo del carrito el localStorage se cambia
  const [total, setTotal] = useState(0);

  console.log(carrito);

  // Realizar efectos secundarios en sus componentes: obtención de datos, actualización directa del DOM y temporizadores.
  useEffect(() => {
    // Runs only on the first render
    const producto = Data.items;
    if (producto) {
      setProductos(producto);
    } else {
      setProductos([]);
    }
  }, []);

  // Añadir datos al Carrito
  const addCarrito = (id) => {
    const check = carrito.every((item) => {
      return item.id !== id; // Devuelve un true
    });
    if (check) {
      const data = productos.filter((producto) => {
        return producto.id === id; // El que sea igual al id lo guardamos en Carrito
      });
      setCarrito([...carrito, ...data]); // Creamos una matriz y le pasamos lo que tengamos en el carrito más lo que hemos obtenido en data
    } else {
      alert("El producto se ha añadido al carrito");
    }
  };

  // AL hacer la petición
  useEffect(() => {
    const dataCarrito = JSON.parse(localStorage.getItem("dataCarrito"));
    if (dataCarrito) {
      setCarrito(dataCarrito);
    }
  }, []);

  // Cada vez que actualice carrito actualizo el localStorage
  useEffect(() => {
    localStorage.setItem("dataCarrito", JSON.stringify(carrito));
  }, [carrito]);

  // Opcion 1 map. Calcular total
  useEffect(() => {
    const getTotal = () => {
      const sumResult = carrito.reduce((accumulator, item) => {
        return accumulator + item.price * item.cantidad;
      }, 0);
      setTotal(sumResult);
    };
    getTotal();
  }, [carrito]);

  // Context: Podemos acceder a las manejadores de estado ejemplo: y las funciones desde cualquier componente hijo
  const value = {
    productos: [productos],
    menu: [menu, setMenu],
    addCarrito: addCarrito,
    carrito: [carrito, setCarrito],
    total: [total, setTotal],
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
