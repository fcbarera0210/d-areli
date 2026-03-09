"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

type CartFloatingButtonProps = {
  onClick: () => void;
};

export function CartFloatingButton({ onClick }: CartFloatingButtonProps) {
  const { items } = useCart();
  const totalItems = items.reduce((sum, i) => sum + i.cantidad, 0);

  if (totalItems === 0) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ver carrito (${totalItems} productos)`}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
    >
      <ShoppingCart size={24} aria-hidden />
      <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white">
        {totalItems}
      </span>
    </button>
  );
}
