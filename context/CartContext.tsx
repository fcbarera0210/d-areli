"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type CartItem = {
  id: string;
  nombre: string;
  precio: string;
  cantidad: number;
  isTemporal: boolean;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cantidad"> | CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (item: Omit<CartItem, "cantidad"> | CartItem) => {
      const cantidad = "cantidad" in item ? item.cantidad : 1;
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, cantidad: i.cantidad + cantidad } : i
          );
        }
        return [...prev, { ...item, cantidad }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, cantidad: number) => {
    if (cantidad <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
