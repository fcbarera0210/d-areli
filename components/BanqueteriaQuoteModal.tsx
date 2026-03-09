"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/config";

type BanqueteriaQuoteModalProps = {
  menuId: string;
  menuTitle: string;
  onClose: () => void;
};

export function BanqueteriaQuoteModal({
  menuId,
  menuTitle,
  onClose,
}: BanqueteriaQuoteModalProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [lugar, setLugar] = useState("");
  const [dAreliSugiere, setDAreliSugiere] = useState(false);
  const [comensales, setComensales] = useState("");

  const handleSubmit = () => {
    const lugarTexto = dAreliSugiere
      ? "Que D'Areli sugiera un lugar"
      : lugar || "(no indicado)";

    const lineas: string[] = [];
    lineas.push("¡Hola! Solicito presupuesto para banquetería:");
    lineas.push("");
    lineas.push(`*Menú:* ${menuTitle}`);
    lineas.push("");
    lineas.push("*Datos del solicitante:*");
    lineas.push(`Nombre: ${nombre || "(no indicado)"}`);
    lineas.push(`Teléfono: ${telefono || "(no indicado)"}`);
    lineas.push(`Email: ${email || "(no indicado)"}`);
    lineas.push("");
    lineas.push("*Detalles del evento:*");
    lineas.push(`Lugar: ${lugarTexto}`);
    lineas.push(`Comensales: ${comensales || "(no indicado)"} personas`);

    const text = lineas.join("\n");
    window.open(buildWhatsAppUrl(text), "_blank");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
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
            Solicitar presupuesto
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <p className="text-sm text-neutral-600">
            Menú seleccionado: <strong>{menuTitle}</strong>
          </p>

          <div>
            <label
              htmlFor="quote-nombre"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Nombre completo
            </label>
            <input
              id="quote-nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: María González"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="quote-telefono"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Teléfono
            </label>
            <input
              id="quote-telefono"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej: +56987654321"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="quote-email"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Email
            </label>
            <input
              id="quote-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej: maria@ejemplo.com"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Lugar del evento
            </label>
            <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 mb-2 has-[:checked]:border-black has-[:checked]:bg-neutral-50">
              <input
                type="radio"
                name="lugar-tipo"
                checked={!dAreliSugiere}
                onChange={() => setDAreliSugiere(false)}
                className="w-4 h-4"
              />
              <span className="text-sm">Indicar lugar</span>
            </label>
            {!dAreliSugiere && (
              <input
                type="text"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                placeholder="Ej: Salón Los Robles, Romeral"
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent mt-1"
              />
            )}
            <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 mt-2 has-[:checked]:border-black has-[:checked]:bg-neutral-50">
              <input
                type="radio"
                name="lugar-tipo"
                checked={dAreliSugiere}
                onChange={() => setDAreliSugiere(true)}
                className="w-4 h-4"
              />
              <span className="text-sm">Que D&apos;Areli sugiera un lugar</span>
            </label>
          </div>

          <div>
            <label
              htmlFor="quote-comensales"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Cantidad de comensales
            </label>
            <input
              id="quote-comensales"
              type="number"
              min="1"
              value={comensales}
              onChange={(e) => setComensales(e.target.value)}
              placeholder="Ej: 80"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        <div className="p-4 border-t border-neutral-100">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            Solicitar presupuesto por WhatsApp
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
