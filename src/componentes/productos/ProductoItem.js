import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider.js";
import { Link } from "react-router-dom";

export const ProductoItem = ({
  id,
  title,
  price,
  image,
  category,
  img1,
  img2,
  cantidad
}) => {
  const value = useContext(DataContext);
  const addCarrito = value.addCarrito;

  return (
    <div className="producto">
      <a href="#">
        <div className="producto__img">
          <img src={image} alt={title} />
        </div>
      </a>
      <div className="producto__footer">
        <h1>{title}</h1>
        <p>{category}</p>
        <p className="price">{price}€</p>
      </div>
      <div className="button">
        <button className="btn" onClick={() => addCarrito(id)}>Añadir al carrito</button>
        <div>
          <a href="#" className="btn">
            Detalles
          </a>
        </div>
      </div>
    </div>
  );
};

//export default ProductosItem;
