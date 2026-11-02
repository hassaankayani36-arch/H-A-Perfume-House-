import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../api/client.js";
import { normalizeProducts } from "../data/products.js";

const ProductContext = createContext(undefined);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reloadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const sourceProducts = await apiRequest("/api/products");
      setProducts(normalizeProducts(sourceProducts));
    } catch (requestError) {
      setProducts([]);
      setError(requestError instanceof Error ? requestError.message : "The product catalog could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reloadProducts();
  }, [reloadProducts]);

  const value = useMemo(() => ({ products, loading, error, reloadProducts }), [products, loading, error, reloadProducts]);
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
}
