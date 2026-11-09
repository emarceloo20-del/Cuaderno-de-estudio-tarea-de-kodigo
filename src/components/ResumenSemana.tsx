import Link from "next/link";
import { apiFetch } from "@/lib/api";
import type { Materia } from "@/lib/data";

export default async function ResumenSemana() {
  const data = await apiFetch<{ materias: Materia[] }>("/api/materias");
  const materias = data?.materias ?? [];
  const max = Math.max(...materias.map((m) => m.horasSemana), 1);
  const total = materias.reduce((s, m) => s + m.horasSemana, 0);

  return (
    <div>
      <p className="mb-4 text-sm text-grafito/80">
        Horas sugeridas por semana: <strong className="text-tinta">{total} h</strong> en total.
      </p>
      <ul className="space-y-3">
        {materias.map((m) => (
          <li key={m.id}>
            <Link
              href={`/materias/${m.id}`}
              className="group block rounded-sm py-1"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-semibold text-tinta group-hover:underline">
                  {m.nombre}
                </span>
                <span className="text-sm tabular-nums text-grafito/80">
                  {m.horasSemana} h
                </span>
              </div>
              <div
                className="mt-1 h-2.5 rounded-sm bg-papel"
                role="img"
                aria-label={`${m.horasSemana} de ${max} horas máximas`}
              >
                <div
                  className="h-full rounded-sm"
                  style={{
                    width: `${(m.horasSemana / max) * 100}%`,
                    backgroundColor: m.color,
                  }}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
