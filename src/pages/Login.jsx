import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../validation/auth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/perfil";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [fieldErrs, setFieldErrs] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setFieldErrs({});

    // 1) Validación con Zod
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const fe = {};
      for (const issue of parsed.error.issues) {
        fe[issue.path[0]] = issue.message;
      }
      setFieldErrs(fe);
      return;
    }

    // 2) Llamada a API con manejo de errores
    try {
      await login(email, password); // guarda token + user en contexto
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message || "Error de autenticación");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>

      {err && <div className="alert alert-error" role="alert">{err}</div>}

      <form onSubmit={onSubmit} className="row" style={{ maxWidth: 420 }}>
        <label className="label">Correo</label>
        <input
          className={`input ${fieldErrs.email ? "input-error" : ""}`}
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!fieldErrs.email}
          aria-describedby={fieldErrs.email ? "email-error" : undefined}
        />
        {fieldErrs.email && (
          <p id="email-error" className="field-error">{fieldErrs.email}</p>
        )}

        <label className="label">Contraseña</label>
        <input
          className={`input ${fieldErrs.password ? "input-error" : ""}`}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!fieldErrs.password}
          aria-describedby={fieldErrs.password ? "password-error" : undefined}
        />
        {fieldErrs.password && (
          <p id="password-error" className="field-error">{fieldErrs.password}</p>
        )}

        <button className="btn-primary" type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: 12, opacity: 0.8 }}>
        Demo: cualquier correo/contraseña funciona (valida formato y longitud).
      </p>
    </div>
  );
}
