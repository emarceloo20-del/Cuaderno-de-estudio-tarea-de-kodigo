import Link from "next/link";
import { Suspense } from "react";
import FraseDelDia from "@/components/FraseDelDia";
import ResumenSemana from "@/components/ResumenSemana";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="hoja py-10 pl-16 pr-6 md:pl-20 md:pr-12">
        <h1 className="max-w-xl font-display text-4xl font-bold leading-tight text-tinta md:text-5xl">
          Tu semana de estudio, en <span className="marca">una sola hoja</span>.
        </h1>
        <p className="mt-6 max-w-lg text-lg">
          Ordena tus materias, anota lo pendiente y estudia por bloques de
          tiempo sin perder el hilo.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tareas"
            className="rounded-sm border-2 border-tinta bg-tinta px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white hover:text-tinta"
          >
            Anotar una tarea
          </Link>
          <Link
            href="/materias"
            className="rounded-sm border-2 border-tinta bg-white px-5 py-2.5 font-semibold text-tinta transition-colors hover:bg-resaltador"
          >
            Ver materias
          </Link>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-5">
        <section className="md:col-span-2" aria-labelledby="frase">
          <h2 id="frase" className="mb-3 font-display text-2xl font-bold text-tinta">
            Para hoy
          </h2>
          <div className="border-l-4 border-margen bg-white p-5">
            <Suspense
              fallback={<p className="text-grafito/60">Cargando la nota del día…</p>}
            >
              <FraseDelDia />
            </Suspense>
          </div>
        </section>

        <section className="md:col-span-3" aria-labelledby="semana">
          <h2 id="semana" className="mb-3 font-display text-2xl font-bold text-tinta">
            Carga de la semana
          </h2>
          <div className="bg-white p-5">
            <Suspense
              fallback={<p className="text-grafito/60">Cargando materias…</p>}
            >
              <ResumenSemana />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
