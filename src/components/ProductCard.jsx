import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

function ProductCardBase({ p }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  // Formateo caro → memorizar
  const priceLabel = useMemo(() => `$ ${p.price} MXN`, [p.price]);

  return (
    <div className="card">
      <img
        src={p.image}
        alt={p.name}
        className="card-img"
        onError={(e) => { e.currentTarget.src = "/img/album.svg"; }}
      />

      <div className="card-body">
        <h4 className="card-title">{p.name}</h4>
        <p className="price">{priceLabel}</p>
        <p>
          <span className="badge">{p.category}</span>{" "}
          <span className="kchip">{p.group}</span>
          {p.tags?.includes("preventa") && <span className="badge badge-pre">Preventa</span>}
          {p.tags?.includes("oferta") && <span className="badge badge-sale">Oferta</span>}
        </p>
        <p>⭐ {p.rating}</p>

        <div className="row">
          <Link className="btn" to={`/producto/${p.id}`}>Ver</Link>
          <button className="btn-primary" onClick={() => toggleFavorite(p.id)}>
            {isFavorite(p.id) ? "♥ Quitar" : "♡ Fav"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Evita re-renders si "p" no cambió (shallow)
const ProductCard = memo(ProductCardBase);
export default ProductCard;
