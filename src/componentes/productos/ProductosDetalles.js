import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataProvider";
import { useParams } from "react-router-dom";
import { ProductoItem } from "./ProductoItem";

export const ProductosDetalles = () => {
  const value = useContext(DataContext); // manegador de variables globales( otra opción react redux)
  const [productos] = value.productos; // value.menu propiedad de DataProvider
  const [detalle, setDetalle] = useState([]);
  const [url, setUrl] = useState(0);
  const [images, setImages] = useState([]);
  const addCarrito = value.addCarrito;

  const params = useParams();
  let item = 0;
  /*const { id } = useParams();

  const navegar = useNavigate();

  const enviar = (e) => {
    e.preventDefault();
    let nombre = e.target.nombre.value;
    let apellido = e.target.apellido.value;
    let url = `/persona/${nombre}/${apellido}`;
    
    //console.log(url);
    navegar(`/persona/${nombre}/${apellido}`);
    
  };*/

  useEffect(() => {
    productos.forEach((producto) => {
      item = 0;
      if (producto.id === parseInt(params.id)) {
        setDetalle(producto);
        setUrl(0); // Por defecto no existe url 0, con la ternaria obtengo image
      }
    });
  }, [params.id, productos]);

  // Cuando se modifique la url desde el input o si cambiamos de imagen a ver detalles
  useEffect(() => {
    const values = `${detalle.img1}${url}${detalle.img2}`;
    setImages(values);
  }, [url, params.id]);

  //console.log(detalle);

  // Detectar cambios en el input slider
  const handleInput = (e) => {
    // Necesitamos transformar el numero del input a string con dos decimales, empezando por 01
    const number = e.target.value.toString().padStart(2, "01");
    setUrl(number);
    console.log(number);
  };

  if (detalle.length < 1) return null;

  // Por cada número del 1 al 36 se renderiza una imagen diferente, efecto 360
  return (
    <>
      {
        <div className="detalles">
          <h2>{detalle.title}</h2>
          <p className="price">{detalle.price}€</p>
          <div className="grid">
            <p className="nuevo">Nuevo</p>
            <div className="size">
              <select placeholder="Tamaño">
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
                <option value="1">6</option>
                <option value="1">7</option>
                <option value="1">8</option>
                <option value="1">9</option>
              </select>
              <p>Tamaño</p>
            </div>
          </div>
          <button onClick={() => addCarrito(detalle.id)}>
            Añadir al carrito
          </button>
          {url ? (
            <img
              //src="https://stockx-360.imgix.net/Nike-LD-Waffle-Sacai-White-Nylon/Images/Nike-LD-Waffle-Sacai-White-Nylon/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1606325338&w=1000"
              src={images}
              alt={detalle.title}
            />
          ) : (
            <img src={detalle.image} alt={detalle.title} />
          )}

          <input
            type="range"
            min="1"
            max="36"
            value={url}
            onChange={handleInput}
          />
          <div className="description">
            <p>
              <b>Description:</b> Nam sapien ex, aliquet ut elementum id,
              lobortis ut diam. Aliquam massa velit, auctor blandit quam id,
              vestibulum laoreet nibh. Aliquam mollis, lorem nec scelerisque
              pharetra, tellus mauris aliquam diam, eu venenatis dui lorem quis
              ipsum.
              <br /> <br /> Duis a enim aliquet, eleifend magna a, varius enim.
              Morbi scelerisque, ex pellentesque ullamcorper ullamcorper, libero
              dolor fermentum lorem, et euismod magna justo eu enim. Sed
              molestie sapien eu diam dapibus facilisis.
            </p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      }
      <h2 className="relacionado">Productos Relacionados</h2>
      <div className="productos">
        {productos.map((producto) => {
          if ((item < 6)&&(detalle.category === producto.category)) {
            item++;
            return <ProductoItem
              key={producto.id}
              id={producto.id}
              title={producto.title}
              price={producto.price}
              image={producto.image}
              category={producto.category}
              img1={producto.img1}
              img2={producto.img2}
              cantidad={producto.cantidad}
            />;
          }
        })}
      </div>
    </>
  );
};
