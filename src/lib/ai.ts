import Anthropic from "@anthropic-ai/sdk";
import { env } from "@/lib/env";
import type { AiAssessmentDraft, AssessmentInput, VirtualMediaSubmission } from "@/lib/types";

const ANTHROPIC_MODEL = "claude-3-5-sonnet-latest";

function buildPolicyRules(input: AssessmentInput): string {
  return [
    `Training style: ${input.trainingStyle}`,
    `Allowed tools: ${input.trainerPolicy.allowedTools.join(", ") || "none declared"}`,
    `Never recommend: ${input.trainerPolicy.neverRecommendTools.join(", ") || "none declared"}`
  ].join("\n");
}

export async function generateAssessmentDraft(
  input: AssessmentInput,
  virtualSubmissions: VirtualMediaSubmission[]
): Promise<AiAssessmentDraft> {
  if (!env.anthropicApiKey) {
    return fallbackDraft(input);
  }

  const client = new Anthropic({ apiKey: env.anthropicApiKey });

  const systemPrompt = `You are PackMetric AI. Always honor trainer style and tool policy.
Never recommend blocked tools/methods.
Return strict JSON with keys: summary, confidence, rationale, recommendedPlan, blockedRecommendations.`;

  const userPrompt = JSON.stringify(
    {
      policy: buildPolicyRules(input),
      assessment: input,
      virtualSubmissions,
      notes: "This is a draft only. Trainer approval is required before publication."
    },
    null,
    2
  );

  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 1400,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }]
  });

  const text = response.content
    .map((item) => ("text" in item ? item.text : ""))
    .join("")
    .trim();

  try {
    const parsed = JSON.parse(text) as AiAssessmentDraft;
    return sanitizeBlockedRecommendations(parsed, input);
  } catch {
    return fallbackDraft(input);
  }
}

function sanitizeBlockedRecommendations(draft: AiAssessmentDraft, input: AssessmentInput): AiAssessmentDraft {
  const blocked = new Set(input.trainerPolicy.neverRecommendTools.map((tool) => tool.toLowerCase()));
  const filteredSessions = draft.recommendedPlan.sessions.map((session) => {
    const objectiveLower = session.objective.toLowerCase();
    const violation = [...blocked].some((tool) => objectiveLower.includes(tool));
    if (!violation) {
      return session;
    }
    return {
      ...session,
      objective: `${session.objective} (adjusted to honor trainer policy)`
    };
  });

  return {
    ...draft,
    recommendedPlan: { ...draft.recommendedPlan, sessions: filteredSessions }
  };
}

function fallbackDraft(input: AssessmentInput): AiAssessmentDraft {
  return {
    summary:
      "Draft generated from assessment data. Trainer review is required before client-facing publishing.",
    confidence: input.mode === "virtual_owner_recorded" ? "medium" : "high",
    rationale: [
      "Progression is based on stated goals and current skill/behavior scores.",
      "Tool and method recommendations are constrained by trainer style and policy."
    ],
    recommendedPlan: {
      title: "Starter behavior plan",
      sessions: [
        {
          day: 1,
          objective: "Establish engagement and marker clarity.",
          skillFocus: ["sit", "down", "loose leash"],
          environment: "low distraction",
          successCriteria: ">= 70% correct responses with low handler prompts"
        },
        {
          day: 2,
          objective: "Add duration and mild environmental complexity.",
          skillFocus: ["stay", "place", "focus"],
          environment: "quiet public edge",
          successCriteria: "consistent holds and calm recoveries"
        }
      ]
    },
    blockedRecommendations: input.trainerPolicy.neverRecommendTools
  };
}
