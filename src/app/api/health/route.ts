import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connect";

export async function GET() {
  await connectToDatabase();

  return NextResponse.json({
    ok: true,
    service: "milkman",
    db: "connected",
  });
}
