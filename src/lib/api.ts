import { headers } from "next/headers";

/**
 * Llama a un Route Handler propio desde un Server Component.
 * Construye la URL absoluta a partir de la petición actual, así funciona
 * igual en local y en Vercel sin variables extra.
 */
export async function apiFetch<T>(path: string): Promise<T | null> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const res = await fetch(`${proto}://${host}${path}`, { cache: "no-store" });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`La API respondió ${res.status} en ${path}`);
  }
  return (await res.json()) as T;
}
