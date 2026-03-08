import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "D'Areli - Banquetería y Cocinería",
  description: "D'Areli: banquetería para eventos y cocinería con almuerzos individuales tipo menú ejecutivo. Romeral, Región del Maule, Chile.",
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
