const express = require("express");
const cors = require("cors");
const app = express();

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== Mock de productos CelBa-Store =====
const products = [
  {
    id: "cb001",
    name: "Lightstick Oficial — BTS ARMY Bomb SE",
    price: 1899,
    category: "Lightsticks",
    group: "BTS",
    image: "/img/products/bts-army-bomb.jpg",
    rating: 4.8,
    tags: ["oficial", "preventa"]
  },
  {
    id: "cb002",
    name: "Álbum — NewJeans 'Get Up' (Bunny ver.)",
    price: 699,
    category: "Álbumes",
    group: "NewJeans",
    image: "/img/products/newjeans-get-up.jpg",
    rating: 4.6,
    tags: ["oferta"]
  },
  {
    id: "cb003",
    name: "Photocards — Stray Kids (Set x10)",
    price: 320,
    category: "Photocards",
    group: "Stray Kids",
    image: "/img/products/straykids-pcs.jpg",
    rating: 4.4,
    tags: ["fanmade"]
  }
];

// ===== Ruta raíz (mensaje informativo) =====
app.get("/", (_req, res) => {
  res.send(
    "✅ CelBa-Store API corriendo. Endpoints: /api/ping, /api/products, /api/products/:id, POST /api/login, (protegido) GET /api/profile"
  );
});

// ===== Endpoints públicos =====
app.get("/api/ping", (_req, res) => {
  res.json({ ok: true, message: "pong", time: new Date().toISOString() });
});

app.get("/api/products", (_req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const p = products.find((x) => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(p);
});

// ===== Auth simple (DEMO) =====
// POST /api/login -> { email, password } => { token, user }
app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email y password requeridos" });
  }
  // En un caso real, validarías contra una base de datos y emitirías un JWT.
  const token = "celba-demo-token";
  res.json({ token, user: { email } });
});

// Middleware para proteger rutas con Bearer token
function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const [scheme, token] = auth.split(" ");
  if (scheme !== "Bearer" || token !== "celba-demo-token") {
    return res.status(401).json({ error: "No autorizado" });
  }
  next();
}

// ===== Endpoint protegido =====
app.get("/api/profile", requireAuth, (_req, res) => {
  res.json({
    email: "usuario@celba.store",
    name: "CelBa User",
    role: "customer",
    favoritesCountHint: "Acceso concedido con token válido."
  });
});

// ===== Arranque =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ API CelBa-Store escuchando en http://localhost:${PORT}`);
});
