import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cuaderno · Planificador de estudio",
    template: "%s · Cuaderno",
  },
  description:
    "Planifica tus materias, anota tus tareas y estudia por bloques con un temporizador Pomodoro.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="relative flex min-h-full flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:py-12">
          {children}
        </main>
        <footer className="border-t-2 border-tinta bg-hoja">
          <p className="mx-auto max-w-5xl px-4 py-4 text-sm text-grafito/80">
            Cuaderno es un proyecto académico de Next.js construido con Vibe Coding.
          </p>
        </footer>
      </body>
    </html>
  );
}
