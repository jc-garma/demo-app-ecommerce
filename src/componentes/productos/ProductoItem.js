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
      <Link to={`/productos/${id}`}>
        <div className="producto__img">
          <img src={image} alt={title} />
        </div>
      </Link>
      <div className="producto__footer">
        <h1>{title}</h1>
        <p>{category}</p>
        <p className="price">{price}€</p>
      </div>
      <div className="button">
        <button className="btn" onClick={() => addCarrito(id)}>Añadir al carrito</button>
        <div>
          <Link to={`/productos/${id}`} className="btn">
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

//export default ProductosItem;
