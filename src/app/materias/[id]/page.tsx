import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { Materia } from "@/lib/data";
import { materiaPorId } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const m = materiaPorId(id);
  return { title: m ? m.nombre : "Materia no encontrada" };
}

export default async function MateriaPage({ params }: Props) {
  const { id } = await params;
  const data = await apiFetch<{ materia: Materia }>(`/api/materias/${id}`);
  if (!data) notFound();
  const m = data.materia;

  return (
    <article className="space-y-8">
      <Link href="/materias" className="text-sm font-semibold text-tinta underline">
        Volver a materias
      </Link>

      <header
        className="bg-white p-6 md:p-8"
        style={{ borderLeft: `12px solid ${m.color}` }}
      >
        <h1 className="font-display text-4xl font-bold text-tinta">{m.nombre}</h1>
        <p className="mt-3 max-w-2xl text-lg">{m.descripcion}</p>
        <p className="mt-4 font-semibold text-tinta">
          Dedícale {m.horasSemana} horas por semana.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <section aria-labelledby="temas">
          <h2 id="temas" className="mb-3 font-display text-2xl font-bold text-tinta">
            Temas
          </h2>
          <ul className="bg-white p-5">
            {m.temas.map((t) => (
              <li key={t} className="border-b border-papel py-2 last:border-0">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="consejo">
          <h2 id="consejo" className="mb-3 font-display text-2xl font-bold text-tinta">
            Cómo estudiarla
          </h2>
          <p className="border-l-4 border-margen bg-white p-5 font-display text-lg italic text-tinta">
            {m.consejo}
          </p>
          <Link
            href={`/tareas?materia=${m.id}`}
            className="mt-5 inline-block rounded-sm border-2 border-tinta bg-tinta px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white hover:text-tinta"
          >
            Anotar una tarea de {m.nombre}
          </Link>
        </section>
      </div>
    </article>
  );
}
