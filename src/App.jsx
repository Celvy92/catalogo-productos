import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Carga diferida (divide el bundle):
const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));

export default function App() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<div className="container"><p>Cargando…</p></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/producto/:id" element={<ProductDetail />} />

            <Route
              path="/favoritos"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
