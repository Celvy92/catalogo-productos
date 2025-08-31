import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { apiGetProducts } from "../services/api";

export default function Catalog() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [err, setErr] = useState("");

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");
  const [group, setGroup] = useState("Todos");
  const [sort, setSort] = useState("relevance");

  useEffect(() => {
    setLoading(true);
    setErr("");
    apiGetProducts()
      .then((data) => setList(data))
      .catch((e) => setErr(e.message || "Error al cargar productos"))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["Todas", ...new Set(list.map((p) => p.category))],
    [list]
  );
  const groups = useMemo(
    () => ["Todos", ...new Set(list.map((p) => p.group))],
    [list]
  );

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    let arr = list.filter((p) => {
      const matchesText =
        p.name.toLowerCase().includes(t) || p.group.toLowerCase().includes(t);
      const matchesCat = cat === "Todas" || p.category === cat;
      const matchesGroup = group === "Todos" || p.group === group;
      return matchesText && matchesCat && matchesGroup;
    });

    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    else if (sort === "rating-desc") arr = [...arr].sort((a, b) => b.rating - a.rating);

    return arr;
  }, [list, q, cat, group, sort]);

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

        <select className="input" style={{ maxWidth: 220 }} value={cat} onChange={(e) => setCat(e.target.value)}>
          {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>

        <select className="input" style={{ maxWidth: 220 }} value={group} onChange={(e) => setGroup(e.target.value)}>
          {groups.map((g) => (<option key={g} value={g}>{g}</option>))}
        </select>

        <select className="input" style={{ maxWidth: 220 }} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="relevance">Orden: Relevancia</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="rating-desc">Rating: más alto</option>
        </select>
      </div>

      {loading && <p>Cargando productos…</p>}
      {err && <div className="alert alert-error" role="alert">{err}</div>}

      {!loading && !err && (
        <div className="grid">
          {filtered.map((p) => (<ProductCard key={p.id} p={p} />))}
        </div>
      )}
    </div>
  );
}
