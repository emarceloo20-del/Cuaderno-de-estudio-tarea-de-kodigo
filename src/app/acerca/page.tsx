import type { Metadata } from "next";

export const metadata: Metadata = { title: "Acerca" };

const piezas = [
  ["Next.js 16 con App Router", "Rutas, layouts, Route Handlers, loading.tsx, error.tsx y not-found.tsx."],
  ["TypeScript", "Tipos compartidos entre la API y las páginas para detectar errores antes de ejecutar."],
  ["Tailwind CSS", "Estilos con una paleta propia de cuaderno: papel, tinta, margen rojo y resaltador."],
  ["Server y Client Components", "Las páginas de datos se renderizan en el servidor; las que interactúan usan useState y useEffect."],
];

export default function AcercaPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <header>
        <h1 className="font-display text-4xl font-bold text-tinta">Acerca de Cuaderno</h1>
        <p className="mt-3 text-lg">
          Cuaderno es una aplicación para organizar el estudio de una carrera
          universitaria: materias, tareas y bloques de concentración. Se
          construyó con IA como copiloto, dirigiendo y revisando cada paso.
        </p>
      </header>

      <section aria-labelledby="stack">
        <h2 id="stack" className="mb-3 font-display text-2xl font-bold text-tinta">
          Con qué está hecha
        </h2>
        <dl className="divide-y divide-papel bg-white">
          {piezas.map(([t, d]) => (
            <div key={t} className="p-4">
              <dt className="font-semibold text-tinta">{t}</dt>
              <dd className="mt-1">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="rutas">
        <h2 id="rutas" className="mb-3 font-display text-2xl font-bold text-tinta">
          Rutas de la API
        </h2>
        <ul className="space-y-2 bg-white p-4">
          <li><code className="font-semibold text-tinta">GET /api/materias</code>: lista de materias; acepta <code>?q=</code>.</li>
          <li><code className="font-semibold text-tinta">GET /api/materias/[id]</code>: detalle de una materia.</li>
          <li><code className="font-semibold text-tinta">GET /api/frase</code>: nota de estudio al azar.</li>
        </ul>
      </section>
    </div>
  );
}
