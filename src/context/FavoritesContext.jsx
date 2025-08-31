import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem("celba:favs");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persistir localStorage solo cuando cambie
  useEffect(() => {
    localStorage.setItem("celba:favs", JSON.stringify(ids));
  }, [ids]);

  // Set para búsqueda O(1), memorizado
  const idSet = useMemo(() => new Set(ids), [ids]);

  const isFavorite = useCallback((id) => idSet.has(id), [idSet]);

  const toggleFavorite = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const clearFavorites = useCallback(() => setIds([]), []);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [ids, isFavorite, toggleFavorite, clearFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
