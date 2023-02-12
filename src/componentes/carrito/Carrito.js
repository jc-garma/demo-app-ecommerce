import React, { useContext } from "react";
//import Card from "../../images/img08.jpg";
import { DataContext } from "../../context/DataProvider.js";

export const Carrito = () => {
  const value = useContext(DataContext); // manegador de variables globales( otra opción react redux)
  const [menu, setMenu] = value.menu; // value.menu propiedad de DataProvider
  const [carrito, setCarrito] = value.carrito; // cada vez que se cambia algo del carrito el localStorage se cambia
  const [total] = value.total; //Solo el total porque no se pueden hacer cambios en el precio

  const show1 = menu ? "carritos show" : "carritos";
  const show2 = menu ? "carrito show" : "carrito";

  const toogleFalse = () => {
    setMenu(false);
  };

  // Elimina un item del carrito por completo
  const removeProducto = (id) => {
    if (window.confirm("¿Desea eliminar el producto del carrito?")) {
      // Cambiamos el array
      carrito.forEach((item, index) => {
        if (item.id === id) {
          item.cantidad = 1; //Actualizo la cantidad del item por defecto
          carrito.splice(index, 1); // Elimino una unidad del item con indice index
        }
      });
      setCarrito([...carrito]);
    }
  };

  // Solo permite disminuir la cantidad de un item del carrito hasta llegar a 1, si se quiere 0 eliminalo por completo
  const restaUnidad = id => {
    carrito.forEach(item => {
      if (item.id === id) {
        item.cantidad === 1 ? item.cantidad = 1 : item.cantidad -= 1;
      }
      setCarrito([...carrito]);
    });
  };

  // Permite aumentar la cantidad de un item del carrito, sin limite
  const sumaUnidad = id => {
    carrito.forEach(item => {
      if (item.id === id) {
        item.cantidad += 1;
      }
      setCarrito([...carrito]);
    });
  };

  return (
    <div className={show1}>
      <div className={show2}>
        <div className="carrito__close" onClick={toogleFalse}>
          <box-icon name="x"></box-icon>
        </div>
        <h2>Su carrito</h2>

        <div className="carrito__center">
        {  
          carrito.length === 0 ? <h2 style={{textAlign: "center", fontSize: "3rem"}}>
            Carrito Vacio
          </h2> : <>
          {
            carrito.map((producto) => (
              <div className="carrito__item" key={producto.id}>
                {/*<img src={Card} alt="" />*/}
                <img src={producto.image} alt="" />
                <div>
                  <h3>{producto.title}</h3>
                  <p className="price">{producto.price}€</p>
                </div>
                <div>
                  <box-icon name="up-arrow" type="solid" onClick={() => sumaUnidad(producto.id)}></box-icon>
                  <p className="cantidad">{producto.cantidad}</p>
                  <box-icon name="down-arrow" type="solid" onClick={() => restaUnidad(producto.id)}></box-icon>
                </div>
                <div
                  className="remove__item"
                  onClick={() => removeProducto(producto.id)}
                >
                  <box-icon name="trash"></box-icon>
                </div>
              </div>
            ))
          }
          </>
        }
        </div>

        <div className="carrito__footer">
          <h3>Total: {total}€ </h3>
          <button className="btn">Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
