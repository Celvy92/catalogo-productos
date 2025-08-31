const BASE = ""; //  proxy de Vite: /api -> http://localhost:3001
//  saltartar el proxy, usar: const BASE = import.meta.env.VITE_API_URL || "";

async function parseOrText(res) {
  try {
    return await res.json();
  } catch {
    const t = await res.text();
    return { error: t || "Error desconocido" };
  }
}

export async function apiPing() {
  const res = await fetch(`${BASE}/api/ping`);
  if (!res.ok) {
    const e = await parseOrText(res);
    throw new Error(e.error || "Ping falló");
  }
  return res.json();
}

export async function apiGetProducts() {
  const res = await fetch(`${BASE}/api/products`);
  if (!res.ok) {
    const e = await parseOrText(res);
    throw new Error(e.error || "No se pudo obtener productos");
  }
  return res.json();
}

export async function apiGetProduct(id) {
  const res = await fetch(`${BASE}/api/products/${id}`);
  if (!res.ok) {
    const e = await parseOrText(res);
    throw new Error(e.error || "Producto no encontrado");
  }
  return res.json();
}

// ==== Auth ====
export async function apiLogin(email, password) {
  const res = await fetch(`${BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const e = await parseOrText(res);
    throw new Error(e.error || "Credenciales inválidas");
  }
  return res.json(); // { token, user }
}

export async function apiGetProfile(token) {
  const res = await fetch(`${BASE}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const e = await parseOrText(res);
    throw new Error(e.error || "No autorizado");
  }
  return res.json();
}
