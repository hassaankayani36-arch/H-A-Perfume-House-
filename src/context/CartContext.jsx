import { jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext(void 0);
const FREE_DELIVERY_THRESHOLD = 2500;
const STANDARD_SHIPPING_FEE = 350;
function loadCartItems() {
  try {
    const saved = localStorage.getItem("ha_cart_items");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const item = entry;
      const legacyPrice = typeof item.rawPrice === "number" ? item.rawPrice : 0;
      if (typeof item.key !== "string" || typeof item.id !== "string" || typeof item.name !== "string" || typeof item.size !== "string" || typeof item.quantity !== "number" || typeof item.image !== "string") {
        return [];
      }
      const discountedPrice = typeof item.discountedPrice === "number" ? item.discountedPrice : legacyPrice;
      return [{
        key: item.key,
        id: item.id,
        name: item.name,
        size: item.size,
        price: typeof item.price === "string" ? item.price : `PKR ${discountedPrice.toLocaleString("en-PK")}`,
        originalPrice: typeof item.originalPrice === "number" ? item.originalPrice : legacyPrice,
        discountedPrice,
        image: item.image,
        quantity: item.quantity,
        family: typeof item.family === "string" ? item.family : "Perfume"
      }];
    });
  } catch {
    return [];
  }
}
const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadCartItems);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("ha_wishlist_items");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("ha_cart_items", JSON.stringify(items));
    } catch (e) {
      console.warn("LocalStorage error", e);
    }
  }, [items]);
  useEffect(() => {
    try {
      localStorage.setItem("ha_wishlist_items", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("LocalStorage error", e);
    }
  }, [wishlist]);
  const addToCart = (product, selectedSize = "50ML", quantity = 1) => {
    const sizeObj = product.sizes?.find((s) => s.size === selectedSize) || {
      size: selectedSize || "50ML",
      price: product.price,
      rawPrice: product.rawPrice,
      discountedPrice: product.discountedPrice
    };
    const itemKey = `${product.id}-${sizeObj.size}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.key === itemKey);
      if (existing) {
        return prev.map(
          (item) => item.key === itemKey ? {
            ...item,
            name: product.name,
            price: sizeObj.price,
            originalPrice: sizeObj.rawPrice,
            discountedPrice: sizeObj.discountedPrice,
            image: product.image,
            family: product.family,
            quantity: item.quantity + quantity
          } : item
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          id: product.id,
          name: product.name,
          size: sizeObj.size,
          price: sizeObj.price,
          originalPrice: sizeObj.rawPrice,
          discountedPrice: sizeObj.discountedPrice,
          image: product.image,
          quantity,
          family: product.family
        }
      ];
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };
  const updateQuantity = (key, delta) => {
    setItems(
      (prev) => prev.map((item) => {
        if (item.key === key) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };
  const setExactQuantity = (key, quantity) => {
    if (quantity <= 0) {
      removeFromCart(key);
      return;
    }
    setItems(
      (prev) => prev.map((item) => item.key === key ? { ...item, quantity } : item)
    );
  };
  const clearCart = () => {
    setItems([]);
  };
  const toggleWishlist = (productId) => {
    setWishlist(
      (prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };
  const isInWishlist = (productId) => wishlist.includes(productId);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + deliveryFee;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressToFreeDelivery = Math.min(100, Math.round(subtotal / FREE_DELIVERY_THRESHOLD * 100));
  return /* @__PURE__ */ jsx(
    CartContext.Provider,
    {
      value: {
        items,
        itemCount,
        subtotal,
        deliveryFee,
        total,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountNeededForFreeDelivery,
        progressToFreeDelivery,
        isCartOpen,
        isSearchOpen,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        setExactQuantity,
        clearCart,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleSearch: () => setIsSearchOpen((prev) => !prev),
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        toggleWishlist,
        isInWishlist
      },
      children
    }
  );
};
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
export {
  CartProvider,
  useCart
};
