import { apiFetch } from "@/lib/api";

export default async function FraseDelDia() {
  const data = await apiFetch<{ frase: string }>("/api/frase");
  return (
    <p className="font-display text-xl italic leading-8 text-tinta">
      {data?.frase ?? "Empieza con diez minutos y mira hasta dónde llegas."}
    </p>
  );
}
