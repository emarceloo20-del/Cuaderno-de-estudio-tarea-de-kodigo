"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { Materia } from "@/lib/data";

type Tarea = {
  id: string;
  texto: string;
  materiaId: string;
  fecha: string;
  hecha: boolean;
};

type Filtro = "todas" | "pendientes" | "hechas";

const CLAVE = "cuaderno:tareas";

// Pequeño almacén sobre localStorage: evita desajustes de hidratación
// (el servidor devuelve null y el cliente lee lo guardado).
const oyentes = new Set<() => void>();

function suscribir(cb: () => void) {
  oyentes.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    oyentes.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function leerGuardado(): string {
  try {
    return localStorage.getItem(CLAVE) ?? "[]";
  } catch {
    return "[]";
  }
}

function guardar(tareas: Tarea[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(tareas));
  } catch {
    /* almacenamiento lleno o bloqueado: la lista queda solo en pantalla */
  }
  oyentes.forEach((cb) => cb());
}

export default function TaskBoard({ materiaInicial }: { materiaInicial?: string }) {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [cargandoMaterias, setCargandoMaterias] = useState(true);
  const [errorMaterias, setErrorMaterias] = useState<string | null>(null);

  const guardado = useSyncExternalStore(suscribir, leerGuardado, () => null);
  const listo = guardado !== null;
  const tareas = useMemo<Tarea[]>(() => {
    if (!guardado) return [];
    try {
      return JSON.parse(guardado) as Tarea[];
    } catch {
      return [];
    }
  }, [guardado]);

  const [texto, setTexto] = useState("");
  const [materiaId, setMateriaId] = useState(materiaInicial ?? "");
  const [fecha, setFecha] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todas");

  // Materias desde el Route Handler interno
  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/materias", { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`Error ${r.status}`);
        return r.json() as Promise<{ materias: Materia[] }>;
      })
      .then((d) => {
        setMaterias(d.materias);
        setMateriaId((actual) => actual || materiaInicial || d.materias[0]?.id || "");
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setErrorMaterias("No se pudieron cargar las materias.");
      })
      .finally(() => setCargandoMaterias(false));
    return () => ctrl.abort();
  }, [materiaInicial]);

  const nombreMateria = (id: string) =>
    materias.find((m) => m.id === id)?.nombre ?? "Sin materia";
  const colorMateria = (id: string) =>
    materias.find((m) => m.id === id)?.color ?? "#94a3b8";

  function agregar(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const limpio = texto.trim();
    if (!limpio) return;
    guardar([
      { id: crypto.randomUUID(), texto: limpio, materiaId, fecha, hecha: false },
      ...tareas,
    ]);
    setTexto("");
    setFecha("");
  }

  const alternar = (id: string) =>
    guardar(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  const eliminar = (id: string) => guardar(tareas.filter((t) => t.id !== id));
  const limpiarHechas = () => guardar(tareas.filter((t) => !t.hecha));

  const visibles = tareas.filter((t) =>
    filtro === "todas" ? true : filtro === "hechas" ? t.hecha : !t.hecha,
  );
  const pendientes = tareas.filter((t) => !t.hecha).length;
  const hechas = tareas.length - pendientes;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <form onSubmit={agregar} className="space-y-4 bg-white p-5 lg:col-span-2 lg:self-start">
        <h2 className="font-display text-2xl font-bold text-tinta">Nueva tarea</h2>

        <div>
          <label htmlFor="texto" className="mb-1 block text-sm font-semibold">
            ¿Qué tienes que hacer?
          </label>
          <input
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
            maxLength={120}
            placeholder="Ej. Resolver el simulacro de álgebra"
            className="w-full rounded-sm border-2 border-tinta bg-white px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="materia" className="mb-1 block text-sm font-semibold">
            Materia
          </label>
          <select
            id="materia"
            value={materiaId}
            onChange={(e) => setMateriaId(e.target.value)}
            disabled={cargandoMaterias || !!errorMaterias}
            className="w-full rounded-sm border-2 border-tinta bg-white px-3 py-2 disabled:opacity-60"
          >
            {cargandoMaterias && <option>Cargando…</option>}
            {materias.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
          {errorMaterias && (
            <p role="alert" className="mt-1 text-sm font-semibold text-margen">
              {errorMaterias} Recarga la página para intentarlo de nuevo.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="fecha" className="mb-1 block text-sm font-semibold">
            Fecha de entrega (opcional)
          </label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full rounded-sm border-2 border-tinta bg-white px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-sm border-2 border-tinta bg-tinta px-4 py-2.5 font-semibold text-white transition-colors hover:bg-white hover:text-tinta"
        >
          Agregar tarea
        </button>
      </form>

      <section className="lg:col-span-3" aria-labelledby="lista">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="lista" className="font-display text-2xl font-bold text-tinta">
              Tu lista
            </h2>
            <p className="text-sm" aria-live="polite">
              {pendientes} pendientes · {hechas} hechas
            </p>
          </div>
          <div className="flex gap-1" role="group" aria-label="Filtrar tareas">
            {(["todas", "pendientes", "hechas"] as Filtro[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFiltro(f)}
                aria-pressed={filtro === f}
                className={`rounded-sm border-2 border-tinta px-3 py-1 text-sm font-semibold capitalize transition-colors ${
                  filtro === f ? "bg-tinta text-white" : "bg-white text-tinta hover:bg-resaltador"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {!listo ? (
          <p className="bg-white p-5 text-grafito/70">Cargando tus tareas…</p>
        ) : visibles.length === 0 ? (
          <p className="bg-white p-5">
            {tareas.length === 0
              ? "Aún no tienes tareas. Anota la primera en el formulario."
              : "No hay tareas en este filtro."}
          </p>
        ) : (
          <ul className="space-y-2">
            {visibles.map((t) => (
              <li
                key={t.id}
                className="flex items-start gap-3 bg-white p-4"
                style={{ borderLeft: `8px solid ${colorMateria(t.materiaId)}` }}
              >
                <input
                  id={`t-${t.id}`}
                  type="checkbox"
                  checked={t.hecha}
                  onChange={() => alternar(t.id)}
                  className="mt-1.5 h-5 w-5 accent-[#1b2a6b]"
                />
                <label htmlFor={`t-${t.id}`} className="min-w-0 flex-1 cursor-pointer">
                  <span className={`block break-words ${t.hecha ? "text-grafito/50 line-through" : ""}`}>
                    {t.texto}
                  </span>
                  <span className="text-sm text-grafito/70">
                    {nombreMateria(t.materiaId)}
                    {t.fecha && ` · entrega ${new Date(t.fecha + "T00:00:00").toLocaleDateString("es-SV", { day: "numeric", month: "short" })}`}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => eliminar(t.id)}
                  aria-label={`Eliminar tarea: ${t.texto}`}
                  className="rounded-sm px-2 py-1 text-sm font-semibold text-margen hover:bg-papel"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        {hechas > 0 && (
          <button
            type="button"
            onClick={limpiarHechas}
            className="mt-4 text-sm font-semibold text-tinta underline"
          >
            Borrar las {hechas} tareas hechas
          </button>
        )}
      </section>
    </div>
  );
}
