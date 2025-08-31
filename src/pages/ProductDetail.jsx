import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGetProduct } from "../services/api";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [p, setP] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setErr("");
    setLoading(true);
    apiGetProduct(id)
      .then(setP)
      .catch((e) => setErr(e.message || "Error al cargar producto"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <p>Cargando producto…</p>
        <Link className="link" to="/catalogo">← Volver</Link>
      </div>
    );
  }

  if (err) {
    return (
      <div className="container">
        <div className="alert alert-error" role="alert">{err}</div>
        <Link className="link" to="/catalogo">← Volver al catálogo</Link>
      </div>
    );
  }

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
          onError={(e) => { e.currentTarget.src = "/img/album.svg"; }}
        />
        <div>
          <h2>{p.name}</h2>
          <p className="price">$ {p.price} MXN</p>
          <p>
            <span className="badge">{p.category}</span>{" "}
            <span className="kchip">{p.group}</span>
          </p>
          <p>Calificación: ⭐ {p.rating}</p>

          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn-primary" onClick={() => toggleFavorite(p.id)}>
              {isFavorite(p.id) ? "♥ Quitar de favoritos" : "♡ Agregar a favoritos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
