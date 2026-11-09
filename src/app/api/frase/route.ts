import { NextResponse } from "next/server";
import { frases } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  return NextResponse.json({ frase });
}
