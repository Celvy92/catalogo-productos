import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>CelBa-Store 🛍️</h1>
      <p>Bienvenida. Ve al <Link className="link" to="/catalogo">Catálogo</Link> para ver productos.</p>
    </div>
  );
}
