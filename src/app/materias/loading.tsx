export default function Loading() {
  return (
    <div className="space-y-8" role="status" aria-live="polite">
      <span className="sr-only">Cargando materias…</span>
      <div className="space-y-3">
        <div className="h-10 w-48 animate-pulse bg-white" />
        <div className="h-5 w-full max-w-lg animate-pulse bg-white" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-40 animate-pulse bg-white" />
        ))}
      </div>
    </div>
  );
}
