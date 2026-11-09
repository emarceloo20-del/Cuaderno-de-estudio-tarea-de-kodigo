"use client";

export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <div className="max-w-lg border-l-4 border-margen bg-white p-6" role="alert">
      <h1 className="font-display text-2xl font-bold text-tinta">
        Algo falló al abrir tus tareas
      </h1>
      <p className="mt-2">Tus datos siguen guardados en el navegador. Intenta de nuevo.</p>
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
