export type TrainingStyle =
  | "balanced"
  | "force_free_r_plus"
  | "lima_evidence_based"
  | "sport_working"
  | "behavior_consulting";

export type AssessmentMode = "on_site" | "virtual_owner_recorded";

export type SkillRating = 0 | 1 | 2 | 3;

export type BehaviorRating = 0 | 1 | 2 | 3;

export type StateOfMind = "anxious" | "overexcited" | "neutral" | "shut_down";

export interface TrainerPolicy {
  allowedTools: string[];
  neverRecommendTools: string[];
}

export interface SkillAssessment {
  name: string;
  understanding: SkillRating;
  handlerHelpRequired: SkillRating;
  stateOfMind: StateOfMind;
}

export interface BehaviorAssessment {
  area: string;
  frequency: BehaviorRating;
  intensity: BehaviorRating;
  recoverySpeed: BehaviorRating;
  triggers: string;
  ownerImpact: "low" | "medium" | "high";
}

export interface AssessmentInput {
  trainerId: string;
  clientId: string;
  dogId: string;
  mode: AssessmentMode;
  trainingStyle: TrainingStyle;
  trainerPolicy: TrainerPolicy;
  skills: SkillAssessment[];
  behaviors: BehaviorAssessment[];
  ownerGoals: string;
  ownerConstraints: string;
  homeEnvironment: string;
}

export interface VirtualAssessmentTask {
  id: string;
  label: string;
  description: string;
}

export interface VirtualMediaSubmission {
  taskId: string;
  mediaUrl: string;
  contextNotes: string;
}

export interface AiAssessmentDraft {
  summary: string;
  confidence: "low" | "medium" | "high";
  rationale: string[];
  recommendedPlan: {
    title: string;
    sessions: Array<{
      day: number;
      objective: string;
      skillFocus: string[];
      environment: string;
      successCriteria: string;
    }>;
  };
  blockedRecommendations: string[];
}
