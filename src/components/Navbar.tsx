"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/materias", texto: "Materias" },
  { href: "/tareas", texto: "Tareas" },
  { href: "/pomodoro", texto: "Pomodoro" },
  { href: "/acerca", texto: "Acerca" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  const activo = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b-2 border-tinta bg-hoja">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-tinta"
          onClick={() => setAbierto(false)}
        >
          Cuaderno
        </Link>

        <button
          type="button"
          className="rounded-sm border-2 border-tinta px-3 py-1 text-sm font-semibold text-tinta md:hidden"
          aria-expanded={abierto}
          aria-controls="menu-principal"
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? "Cerrar" : "Menú"}
        </button>

        <nav
          id="menu-principal"
          aria-label="Principal"
          className={`${abierto ? "block" : "hidden"} absolute left-0 right-0 top-[3.4rem] z-10 border-b-2 border-tinta bg-hoja px-4 pb-3 md:static md:block md:border-0 md:p-0`}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:gap-2">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  aria-current={activo(e.href) ? "page" : undefined}
                  className={`block rounded-sm px-3 py-2 text-sm font-semibold transition-colors ${
                    activo(e.href)
                      ? "marca text-tinta"
                      : "text-grafito hover:text-tinta"
                  }`}
                >
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
