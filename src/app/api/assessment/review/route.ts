import { NextResponse } from "next/server";
import { z } from "zod";
import { finalizeAssessment, getAssessmentRecord } from "@/lib/store";

const reviewSchema = z.object({
  assessmentId: z.string().min(1),
  decision: z.enum(["approved", "edited", "rejected"]),
  trainerDecisionNotes: z.string().default(""),
  approvedPlan: z
    .object({
      title: z.string(),
      sessions: z.array(
        z.object({
          day: z.number(),
          objective: z.string(),
          skillFocus: z.array(z.string()),
          environment: z.string(),
          successCriteria: z.string()
        })
      )
    })
    .optional()
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = reviewSchema.parse(payload);
    const existing = getAssessmentRecord(parsed.assessmentId);
    if (!existing) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }
    if (!existing.aiDraft) {
      return NextResponse.json({ error: "AI draft missing" }, { status: 409 });
    }

    const finalized = finalizeAssessment(
      parsed.assessmentId,
      parsed.decision,
      parsed.trainerDecisionNotes,
      parsed.approvedPlan
    );

    return NextResponse.json({
      status: "review_recorded",
      assessment: finalized
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid review payload",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 400 }
    );
  }
}
