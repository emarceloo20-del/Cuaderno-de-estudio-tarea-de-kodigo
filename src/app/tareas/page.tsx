import type { Metadata } from "next";
import TaskBoard from "@/components/TaskBoard";

export const metadata: Metadata = { title: "Tareas" };

export default async function TareasPage({
  searchParams,
}: {
  searchParams: Promise<{ materia?: string }>;
}) {
  const { materia } = await searchParams;
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-tinta">Tareas</h1>
        <p className="mt-3 text-lg">
          Anota lo pendiente por materia. Tus tareas se guardan en este
          navegador.
        </p>
      </header>
      <TaskBoard materiaInicial={materia} />
    </div>
  );
}
