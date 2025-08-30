import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const p = products.find((x) => x.id === id);

  if (!p) {
    return (
      <div className="container">
        <p>Producto no encontrado.</p>
        <Link className="link" to="/catalogo">← Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link className="link" to="/catalogo">← Volver</Link>
      <div className="row" style={{ alignItems: "flex-start", marginTop: 12 }}>
        <img
          src={p.image}
          alt={p.name}
          style={{ width: 380, height: 260, objectFit: "cover", borderRadius: 12 }}
        />
        <div>
          <h2>{p.name}</h2>
          <p className="price">$ {p.price} MXN</p>
          <p>
            <span className="badge">{p.category}</span>{" "}
            <span className="kchip">{p.group}</span>
          </p>
          <p>Calificación: ⭐ {p.rating}</p>
          <div className="row" style={{ marginTop: 8 }}>
            {p.tags?.map((tag) => (
              <span key={tag} className="kchip">{tag}</span>
            ))}
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <button
              className="btn-primary"
              onClick={() => toggleFavorite(p.id)}
            >
              {isFavorite(p.id) ? "♥ Quitar de favoritos" : "♡ Agregar a favoritos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
