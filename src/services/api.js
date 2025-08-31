// src/services/api.js
export async function apiPing() {
  const res = await fetch("/api/ping");
  if (!res.ok) throw new Error("Ping falló");
  return res.json();
}

export async function apiGetProducts() {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("No se pudo obtener productos");
  return res.json();
}

export async function apiGetProduct(id) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}

// ==== Auth ====
export async function apiLogin(email, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error("Credenciales inválidas");
  return res.json(); // { token, user }
}

export async function apiGetProfile(token) {
  const res = await fetch("/api/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("No autorizado");
  return res.json();
}
