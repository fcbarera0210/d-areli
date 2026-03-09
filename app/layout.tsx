import type { Metadata } from "next";
import { Suspense } from "react";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "D'Areli - Gastronómico",
  description: "D'Areli Gastronómico: eventos y almuerzos ejecutivos. Romeral, Región del Maule, Chile.",
  icons: {
    icon: "/SVG/Recurso%203.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <CartProvider>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-100">Cargando…</div>}>
            {children}
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
