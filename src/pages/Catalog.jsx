import { useMemo, useState } from "react";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

export default function Catalog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");
  const [group, setGroup] = useState("Todos");
  const [sort, setSort] = useState("relevance"); // relevance | price-asc | price-desc | rating-desc

  const categories = useMemo(
    () => ["Todas", ...new Set(products.map((p) => p.category))],
    []
  );
  const groups = useMemo(
    () => ["Todos", ...new Set(products.map((p) => p.group))],
    []
  );

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    let list = products.filter((p) => {
      const matchesText =
        p.name.toLowerCase().includes(t) || p.group.toLowerCase().includes(t);
      const matchesCat = cat === "Todas" || p.category === cat;
      const matchesGroup = group === "Todos" || p.group === group;
      return matchesText && matchesCat && matchesGroup;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === "rating-desc") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }
    // relevance → sin orden adicional (deja el orden natural del JSON)
    return list;
  }, [q, cat, group, sort]);

  return (
    <div className="container">
      <h2>Catálogo CelBa-Store</h2>

      <div className="row" style={{ marginBottom: 12 }}>
        <input
          className="input"
          placeholder="Buscar producto o grupo…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="input"
          style={{ maxWidth: 220 }}
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="input"
          style={{ maxWidth: 220 }}
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          {groups.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select
          className="input"
          style={{ maxWidth: 220 }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Ordenar productos"
        >
          <option value="relevance">Orden: Relevancia</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="rating-desc">Rating: más alto</option>
        </select>
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
