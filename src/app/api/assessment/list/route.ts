import { NextResponse } from "next/server";
import { listAssessments } from "@/lib/store";

export async function GET() {
  return NextResponse.json({
    assessments: listAssessments()
  });
}
