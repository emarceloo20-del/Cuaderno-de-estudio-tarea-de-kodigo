import type { Metadata } from "next";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import type { Materia } from "@/lib/data";

export const metadata: Metadata = { title: "Materias" };

export default async function MateriasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ? `?q=${encodeURIComponent(q)}` : "";
  const data = await apiFetch<{ materias: Materia[] }>(`/api/materias${query}`);
  const materias = data?.materias ?? [];

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-tinta">Materias</h1>
        <p className="mt-3 text-lg">
          Cada materia tiene sus temas, las horas sugeridas por semana y un
          consejo para estudiarla.
        </p>
      </header>

      <form action="/materias" className="flex max-w-md gap-2" role="search">
        <label htmlFor="q" className="sr-only">
          Buscar por materia o tema
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={q ?? ""}
          placeholder="Busca una materia o un tema"
          className="min-w-0 flex-1 rounded-sm border-2 border-tinta bg-white px-3 py-2"
        />
        <button
          type="submit"
          className="rounded-sm border-2 border-tinta bg-tinta px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-tinta"
        >
          Buscar
        </button>
      </form>

      {materias.length === 0 ? (
        <div className="bg-white p-6">
          <p className="font-semibold text-tinta">
            No encontramos resultados para «{q}».
          </p>
          <p className="mt-1">
            Prueba con otra palabra o{" "}
            <Link href="/materias" className="font-semibold underline">
              mira todas las materias
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {materias.map((m) => (
            <li key={m.id}>
              <Link
                href={`/materias/${m.id}`}
                className="block h-full bg-white p-5 transition-transform hover:-translate-y-0.5"
                style={{ borderLeft: `10px solid ${m.color}` }}
              >
                <h2 className="font-display text-2xl font-bold text-tinta">
                  {m.nombre}
                </h2>
                <p className="mt-2">{m.descripcion}</p>
                <p className="mt-4 text-sm font-semibold text-grafito/80">
                  {m.horasSemana} h por semana · {m.temas.length} temas
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
