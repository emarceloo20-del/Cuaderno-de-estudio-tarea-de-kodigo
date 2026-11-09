import { NextResponse } from "next/server";
import { buscarMaterias } from "@/lib/data";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q");
  return NextResponse.json({ materias: buscarMaterias(q) });
}
