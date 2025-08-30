import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function ProductCard({ p }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <article className="card">
      <img src={p.image} alt={p.name} />
      <h3>{p.name}</h3>
      <div className="row">
        <span className="price">$ {p.price} MXN</span>
        <span className="badge">{p.category}</span>
        <span className="kchip">{p.group}</span>
        <span>⭐ {p.rating}</span>
      </div>

      <div className="row" style={{ marginTop: 8 }}>
        {p.tags?.map((tag) => (
          <span key={tag} className="kchip">{tag}</span>
        ))}
      </div>

      <div className="row" style={{ marginTop: 12, justifyContent: "space-between" }}>
        <Link className="link" to={`/producto/${p.id}`}>Ver detalle</Link>
        <button
          className="btn-primary"
          onClick={() => toggleFavorite(p.id)}
          aria-label="Agregar a favoritos"
          title={isFavorite(p.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite(p.id) ? "♥ Favorito" : "♡ Agregar"}
        </button>
      </div>
    </article>
  );
}
