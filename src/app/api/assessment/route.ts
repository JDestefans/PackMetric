import { NextResponse } from "next/server";
import { z } from "zod";
import { generateAssessmentDraft } from "@/lib/ai";
import { createAssessmentRecord, saveAiDraft } from "@/lib/store";

const assessmentSchema = z.object({
  trainerId: z.string().min(1),
  clientId: z.string().min(1),
  dogId: z.string().min(1),
  mode: z.enum(["on_site", "virtual_owner_recorded"]),
  trainingStyle: z.enum([
    "balanced",
    "force_free_r_plus",
    "lima_evidence_based",
    "sport_working",
    "behavior_consulting"
  ]),
  trainerPolicy: z.object({
    allowedTools: z.array(z.string()),
    neverRecommendTools: z.array(z.string())
  }),
  skills: z.array(
    z.object({
      name: z.string(),
      understanding: z.number().min(0).max(3),
      handlerHelpRequired: z.number().min(0).max(3),
      stateOfMind: z.enum(["anxious", "overexcited", "neutral", "shut_down"])
    })
  ),
  behaviors: z.array(
    z.object({
      area: z.string(),
      frequency: z.number().min(0).max(3),
      intensity: z.number().min(0).max(3),
      recoverySpeed: z.number().min(0).max(3),
      triggers: z.string(),
      ownerImpact: z.enum(["low", "medium", "high"])
    })
  ),
  ownerGoals: z.string(),
  ownerConstraints: z.string(),
  homeEnvironment: z.string(),
  virtualSubmissions: z
    .array(
      z.object({
        taskId: z.string(),
        mediaUrl: z.string().url(),
        contextNotes: z.string()
      })
    )
    .default([])
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = assessmentSchema.parse(payload);
    const record = createAssessmentRecord(
      {
        trainerId: parsed.trainerId,
        clientId: parsed.clientId,
        dogId: parsed.dogId,
        mode: parsed.mode,
        trainingStyle: parsed.trainingStyle,
        trainerPolicy: parsed.trainerPolicy,
        skills: parsed.skills,
        behaviors: parsed.behaviors,
        ownerGoals: parsed.ownerGoals,
        ownerConstraints: parsed.ownerConstraints,
        homeEnvironment: parsed.homeEnvironment
      },
      parsed.virtualSubmissions
    );

    const aiDraft = await generateAssessmentDraft(record.input, record.virtualSubmissions);
    const saved = saveAiDraft(record.id, aiDraft);

    return NextResponse.json({
      assessmentId: record.id,
      status: "draft_ready",
      draft: saved?.aiDraft
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid assessment input",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 400 }
    );
  }
}
