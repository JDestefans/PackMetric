import { randomUUID } from "node:crypto";
import type { AiAssessmentDraft, AssessmentInput, VirtualMediaSubmission } from "@/lib/types";

type AssessmentRecord = {
  id: string;
  input: AssessmentInput;
  virtualSubmissions: VirtualMediaSubmission[];
  aiDraft?: AiAssessmentDraft;
  trainerDecision?: "approved" | "edited" | "rejected";
  trainerDecisionNotes?: string;
  approvedPlan?: AiAssessmentDraft["recommendedPlan"];
  createdAt: string;
  updatedAt: string;
};

const records = new Map<string, AssessmentRecord>();

export function createAssessmentRecord(input: AssessmentInput, virtualSubmissions: VirtualMediaSubmission[]) {
  const id = randomUUID();
  const now = new Date().toISOString();
  const record: AssessmentRecord = {
    id,
    input,
    virtualSubmissions,
    createdAt: now,
    updatedAt: now
  };
  records.set(id, record);
  return record;
}

export function getAssessmentRecord(id: string) {
  return records.get(id) ?? null;
}

export function saveAiDraft(id: string, aiDraft: AiAssessmentDraft) {
  const record = records.get(id);
  if (!record) return null;
  record.aiDraft = aiDraft;
  record.updatedAt = new Date().toISOString();
  records.set(id, record);
  return record;
}

export function finalizeAssessment(
  id: string,
  decision: "approved" | "edited" | "rejected",
  trainerDecisionNotes: string,
  approvedPlan?: AiAssessmentDraft["recommendedPlan"]
) {
  const record = records.get(id);
  if (!record) return null;
  record.trainerDecision = decision;
  record.trainerDecisionNotes = trainerDecisionNotes;
  record.approvedPlan = approvedPlan;
  record.updatedAt = new Date().toISOString();
  records.set(id, record);
  return record;
}

export function listAssessments() {
  return Array.from(records.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
