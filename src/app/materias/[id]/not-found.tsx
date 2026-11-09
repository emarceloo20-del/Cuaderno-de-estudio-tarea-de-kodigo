import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg border-l-4 border-margen bg-white p-6">
      <h1 className="font-display text-2xl font-bold text-tinta">
        Esa materia no existe
      </h1>
      <p className="mt-2">
        El enlace puede estar mal escrito. Elige una materia de la lista.
      </p>
      <Link
        href="/materias"
        className="mt-4 inline-block rounded-sm border-2 border-tinta bg-tinta px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-tinta"
      >
        Ver materias
      </Link>
    </div>
  );
}
