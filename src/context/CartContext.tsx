import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products.ts';

export interface CartItem {
  key: string;
  id: string;
  name: string;
  size: string;
  price: string;
  rawPrice: number;
  image: string;
  quantity: number;
  family: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  progressToFreeDelivery: number;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  wishlist: string[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  setExactQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 5000;
const STANDARD_SHIPPING_FEE = 350;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ha_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ha_wishlist_items');
      return saved ? JSON.parse(saved) : ['ha-noir'];
    } catch {
      return ['ha-noir'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ha_cart_items', JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('ha_wishlist_items', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [wishlist]);

  const addToCart = (product: Product, selectedSize: string = '50ML', quantity: number = 1) => {
    const sizeObj = product.sizes?.find((s) => s.size === selectedSize) || {
      size: selectedSize || '50ML',
      price: product.price,
      rawPrice: product.rawPrice,
    };

    const itemKey = `${product.id}-${sizeObj.size}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.key === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
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
          rawPrice: sizeObj.rawPrice,
          image: product.image,
          quantity,
          family: product.family,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const updateQuantity = (key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setExactQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(key);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.rawPrice * item.quantity, 0);
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + deliveryFee;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressToFreeDelivery = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
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
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
