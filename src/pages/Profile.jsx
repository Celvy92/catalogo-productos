import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiGetProfile } from "../services/api";

export default function Profile() {
  const { user, token, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiGetProfile(token)
      .then(setProfile)
      .catch(e => setErr(e.message));
  }, [token]);

  return (
    <div className="container">
      <h2>Mi perfil</h2>
      <p><strong>Sesión:</strong> {user?.email}</p>
      <button className="btn-primary" onClick={logout}>Cerrar sesión</button>

      <h3 style={{ marginTop: 16 }}>Datos protegidos desde API:</h3>
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}
      {!err && !profile && <p>Cargando…</p>}
      {profile && (
        <pre style={{ background: "#faf6ff", padding: 12, borderRadius: 12 }}>
{JSON.stringify(profile, null, 2)}
        </pre>
      )}
    </div>
  );
}
