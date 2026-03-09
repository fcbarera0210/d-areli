"use client";

import React, { useState } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppUrl } from "@/lib/config";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

/** Parsea precio tipo "$6.500" a número para cálculos */
function parsePrecio(precio: string): number {
  const cleaned = precio.replace(/[$.]/g, "").replace(/\s/g, "");
  return parseInt(cleaned, 10) || 0;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [entrega, setEntrega] = useState<"delivery" | "retiro">("delivery");
  const [direccion, setDireccion] = useState("");

  const totalItems = items.reduce((sum, i) => sum + i.cantidad, 0);
  const totalRef = items.reduce(
    (sum, i) => sum + parsePrecio(i.precio) * i.cantidad,
    0
  );

  const handleClose = () => {
    setStep(1);
    setNombre("");
    setTelefono("");
    setEmail("");
    setEntrega("delivery");
    setDireccion("");
    onClose();
  };

  const handleSendWhatsApp = () => {
    const lineas: string[] = [];
    lineas.push("¡Hola! Quiero hacer un pedido de cocinería:");
    lineas.push("");
    lineas.push("*Pedido:*");
    items.forEach((i) => {
      lineas.push(`- ${i.cantidad}x ${i.nombre} - ${i.precio}`);
    });
    lineas.push("");
    lineas.push("*Datos:*");
    lineas.push(`Nombre: ${nombre || "(no indicado)"}`);
    lineas.push(`Teléfono: ${telefono || "(no indicado)"}`);
    lineas.push(`Email: ${email || "(no indicado)"}`);
    lineas.push(`Entrega: ${entrega === "delivery" ? "Delivery" : "Retiro en local"}`);
    if (entrega === "delivery" && direccion) {
      lineas.push(`Dirección: ${direccion}`);
    }
    lineas.push("");
    lineas.push(`Total referencial: $${totalRef.toLocaleString("es-CL")}`);

    const text = lineas.join("\n");
    window.open(buildWhatsAppUrl(text), "_blank");
    clearCart();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-h-[90vh] sm:max-h-[85vh] sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-neutral-100">
            <h2 className="text-lg font-bold uppercase tracking-wide">
              {step === 1 && "Tu pedido"}
              {step === 2 && "Datos de contacto"}
              {step === 3 && "Tipo de entrega"}
              {step === 4 && "Confirmar"}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Cerrar"
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {step === 1 && (
              <div className="space-y-4">
                {items.length === 0 ? (
                  <p className="text-neutral-500 text-center py-8">
                    El carrito está vacío
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {item.nombre}
                          </p>
                          <p className="text-neutral-500 text-xs">{item.precio}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.cantidad - 1)
                            }
                            aria-label="Reducir cantidad"
                            className="p-1.5 rounded-full bg-neutral-200 hover:bg-neutral-300"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-medium text-sm">
                            {item.cantidad}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.cantidad + 1)
                            }
                            aria-label="Aumentar cantidad"
                            className="p-1.5 rounded-full bg-neutral-200 hover:bg-neutral-300"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label="Eliminar"
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-right font-bold text-lg">
                  Total: $
                  {totalRef.toLocaleString("es-CL")}
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="cart-nombre"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Nombre completo
                  </label>
                  <input
                    id="cart-nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cart-telefono"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Teléfono
                  </label>
                  <input
                    id="cart-telefono"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej: +56912345678"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cart-email"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="cart-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej: juan@ejemplo.com"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 has-[:checked]:border-black has-[:checked]:bg-neutral-50">
                  <input
                    type="radio"
                    name="entrega"
                    checked={entrega === "delivery"}
                    onChange={() => setEntrega("delivery")}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Delivery</span>
                </label>
                {entrega === "delivery" && (
                  <div className="pl-2">
                    <label
                      htmlFor="cart-direccion"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Dirección de entrega
                    </label>
                    <input
                      id="cart-direccion"
                      type="text"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      placeholder="Ej: Av. Principal 123, Romeral"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                )}
                <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 has-[:checked]:border-black has-[:checked]:bg-neutral-50">
                  <input
                    type="radio"
                    name="entrega"
                    checked={entrega === "retiro"}
                    onChange={() => setEntrega("retiro")}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Retiro en local</span>
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-xl space-y-2">
                  <p className="text-sm font-medium">Resumen del pedido</p>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    {items.map((i) => (
                      <li key={i.id}>
                        {i.cantidad}x {i.nombre} - {i.precio}
                      </li>
                    ))}
                  </ul>
                  <p className="font-bold pt-2">
                    Total: ${totalRef.toLocaleString("es-CL")}
                  </p>
                </div>
                <div className="text-sm text-neutral-600 space-y-1">
                  <p>
                    <strong>Nombre:</strong> {nombre || "(no indicado)"}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {telefono || "(no indicado)"}
                  </p>
                  <p>
                    <strong>Email:</strong> {email || "(no indicado)"}
                  </p>
                  <p>
                    <strong>Entrega:</strong>{" "}
                    {entrega === "delivery" ? "Delivery" : "Retiro en local"}
                  </p>
                  {entrega === "delivery" && direccion && (
                    <p>
                      <strong>Dirección:</strong> {direccion}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-neutral-100 flex gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex-1 py-3 px-4 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50"
              >
                Atrás
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50"
              >
                Seguir comprando
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 && items.length === 0}
                className="flex-1 py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Enviar pedido por WhatsApp
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
