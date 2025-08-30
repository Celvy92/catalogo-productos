import products from "../data/products.json";
import { useFavorites } from "../context/FavoritesContext.jsx";
import ProductCard from "../components/ProductCard";

export default function Favorites() {
  const { favoriteIds } = useFavorites();
  const items = products.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="container">
      <h2>Favoritos ({items.length})</h2>
      {items.length === 0 ? (
        <p>No tienes productos en favoritos todavía.</p>
      ) : (
        <div className="grid">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
