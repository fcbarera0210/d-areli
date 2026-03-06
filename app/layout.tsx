import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "D'Areli Banquetería - Elegir diseño",
  description: "Selecciona el diseño de la web para D'Areli Banquetería.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-100">Cargando…</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
