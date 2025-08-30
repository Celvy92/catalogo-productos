import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-badge">CelBa-Store</span>
          <strong>Catálogo K-Pop & Tendencias</strong>
        </Link>
        <nav className="row" style={{ marginLeft: "auto" }}>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>
      </div>
    </header>
  );
}
