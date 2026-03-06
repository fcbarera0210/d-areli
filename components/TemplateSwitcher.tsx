"use client";

import React from "react";

type TemplateId = 1 | 2;

type Props = {
  activeTemplate: TemplateId;
  onChange: (id: TemplateId) => void;
};

export default function TemplateSwitcher({ activeTemplate, onChange }: Props) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-0 bg-black/90 backdrop-blur-md border-b border-white/20 py-2 shadow-lg"
      role="tablist"
      aria-label="Selección de diseño"
    >
      <span className="text-[10px] uppercase tracking-widest text-white/60 mr-4 hidden sm:inline">
        Ver diseño:
      </span>
      <div className="flex rounded-lg border border-white/20 overflow-hidden">
        <button
          type="button"
          onClick={() => onChange(1)}
          className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
            activeTemplate === 1
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
          aria-pressed={activeTemplate === 1}
          aria-label="Diseño 1"
        >
          Diseño 1
        </button>
        <button
          type="button"
          onClick={() => onChange(2)}
          className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all border-l border-white/20 ${
            activeTemplate === 2
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
          aria-pressed={activeTemplate === 2}
          aria-label="Diseño 2"
        >
          Diseño 2
        </button>
      </div>
    </div>
  );
}
