import { NextResponse } from "next/server";
import { materiaPorId } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const materia = materiaPorId(id);
  if (!materia) {
    return NextResponse.json({ error: "Materia no encontrada" }, { status: 404 });
  }
  return NextResponse.json({ materia });
}
