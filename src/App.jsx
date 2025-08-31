import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/producto/:id" element={<ProductDetail />} />

        {/* Rutas protegidas */}
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
    </>
  );
}
