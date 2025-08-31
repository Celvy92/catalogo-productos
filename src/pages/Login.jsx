import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/perfil";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message || "Error de autenticación");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit} className="row" style={{ maxWidth: 420 }}>
        <input className="input" type="email" placeholder="Correo" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="btn-primary" type="submit">Entrar</button>
      </form>
      {err && <p style={{ color: "crimson", marginTop: 8 }}>{err}</p>}
      <p style={{ marginTop: 12 }}>Demo: cualquier correo/contraseña funciona.</p>
    </div>
  );
}
