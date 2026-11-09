"use client";

import { useEffect, useState } from "react";

const modos = {
  foco: { etiqueta: "Foco", minutos: 25 },
  corto: { etiqueta: "Descanso corto", minutos: 5 },
  largo: { etiqueta: "Descanso largo", minutos: 15 },
} as const;

type Modo = keyof typeof modos;

const formato = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function PomodoroTimer() {
  const [modo, setModo] = useState<Modo>("foco");
  const [segundos, setSegundos] = useState(modos.foco.minutos * 60);
  // Momento exacto en que termina el bloque; null cuando está en pausa
  const [fin, setFin] = useState<number | null>(null);
  const [completados, setCompletados] = useState(0);

  const corriendo = fin !== null;
  const total = modos[modo].minutos * 60;

  function cambiarModo(nuevo: Modo) {
    setModo(nuevo);
    setSegundos(modos[nuevo].minutos * 60);
    setFin(null);
  }

  function alternar() {
    if (fin === null) {
      setFin(Date.now() + segundos * 1000);
    } else {
      setSegundos(Math.max(Math.round((fin - Date.now()) / 1000), 0));
      setFin(null);
    }
  }

  useEffect(() => {
    if (fin === null) return;
    const id = setInterval(() => {
      const restante = Math.max(Math.round((fin - Date.now()) / 1000), 0);
      setSegundos(restante);
      if (restante === 0) {
        setFin(null);
        if (modo === "foco") setCompletados((c) => c + 1);
      }
    }, 250);
    return () => clearInterval(id);
  }, [fin, modo]);

  useEffect(() => {
    document.title = corriendo
      ? `${formato(segundos)} · ${modos[modo].etiqueta}`
      : "Pomodoro · Cuaderno";
  }, [segundos, corriendo, modo]);

  const progreso = ((total - segundos) / total) * 100;

  return (
    <div className="mx-auto max-w-md bg-white p-6 text-center">
      <div className="flex flex-wrap justify-center gap-1" role="group" aria-label="Tipo de bloque">
        {(Object.keys(modos) as Modo[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => cambiarModo(m)}
            aria-pressed={modo === m}
            className={`rounded-sm border-2 border-tinta px-3 py-1 text-sm font-semibold transition-colors ${
              modo === m ? "bg-tinta text-white" : "bg-white text-tinta hover:bg-resaltador"
            }`}
          >
            {modos[m].etiqueta}
          </button>
        ))}
      </div>

      <p
        className="my-8 font-display text-7xl font-bold tabular-nums text-tinta"
        role="timer"
        aria-live="off"
      >
        {formato(segundos)}
      </p>

      <div
        className="h-3 rounded-sm bg-papel"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progreso)}
        aria-label="Progreso del bloque"
      >
        <div className="h-full rounded-sm bg-margen transition-[width] duration-1000 ease-linear" style={{ width: `${progreso}%` }} />
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={alternar}
          disabled={segundos === 0}
          className="rounded-sm border-2 border-tinta bg-tinta px-6 py-2.5 font-semibold text-white transition-colors hover:bg-white hover:text-tinta disabled:opacity-50"
        >
          {corriendo ? "Pausar" : segundos === total ? "Empezar" : "Continuar"}
        </button>
        <button
          type="button"
          onClick={() => cambiarModo(modo)}
          className="rounded-sm border-2 border-tinta bg-white px-6 py-2.5 font-semibold text-tinta transition-colors hover:bg-resaltador"
        >
          Reiniciar
        </button>
      </div>

      <p className="mt-6 text-sm" aria-live="polite">
        {segundos === 0
          ? modo === "foco"
            ? "Bloque terminado. Toma un descanso."
            : "Descanso terminado. Vuelve al foco."
          : `Bloques de foco completados hoy: ${completados}`}
      </p>
    </div>
  );
}
