import type { Metadata } from "next";
import PomodoroTimer from "@/components/PomodoroTimer";

export const metadata: Metadata = { title: "Pomodoro" };

export default function PomodoroPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-tinta">Pomodoro</h1>
        <p className="mt-3 text-lg">
          Trabaja 25 minutos sin distracciones y descansa 5. Después de cuatro
          bloques, toma un descanso largo.
        </p>
      </header>
      <PomodoroTimer />
    </div>
  );
}
