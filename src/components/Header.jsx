import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

export default function Header() {
  const { isAuth, user, logout } = useAuth();
  const { count } = useFavorites();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-badge">CelBa-Store</span>
          <strong>Catálogo K-Pop & Tendencias</strong>
        </Link>
        <nav className="row" style={{ marginLeft: "auto" }}>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/favoritos">Favoritos ({count})</Link>
          {isAuth ? (
            <>
              <Link to="/perfil">{user?.email || "Perfil"}</Link>
              <a href="#" onClick={(e)=>{e.preventDefault(); logout();}}>Salir</a>
            </>
          ) : (
            <Link to="/login">Entrar</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
