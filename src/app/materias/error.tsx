"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-lg border-l-4 border-margen bg-white p-6" role="alert">
      <h1 className="font-display text-2xl font-bold text-tinta">
        No pudimos cargar las materias
      </h1>
      <p className="mt-2">
        La consulta a la API falló. Revisa tu conexión y vuelve a intentarlo.
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-4 rounded-sm border-2 border-tinta bg-tinta px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-tinta"
      >
        Volver a intentar
      </button>
    </div>
  );
}
