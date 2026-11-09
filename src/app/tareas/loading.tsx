export default function Loading() {
  return (
    <div className="grid gap-8 lg:grid-cols-5" role="status" aria-live="polite">
      <span className="sr-only">Cargando tareas…</span>
      <div className="h-72 animate-pulse bg-white lg:col-span-2" />
      <div className="h-72 animate-pulse bg-white lg:col-span-3" />
    </div>
  );
}
