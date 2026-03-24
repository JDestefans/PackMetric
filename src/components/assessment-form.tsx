"use client";

import { useMemo, useState } from "react";
import type { AssessmentMode, TrainingStyle } from "@/lib/types";

const defaultPayload = {
  trainerId: "trainer_demo",
  clientId: "client_demo",
  dogId: "dog_demo",
  mode: "on_site" as AssessmentMode,
  trainingStyle: "balanced" as TrainingStyle,
  trainerPolicy: {
    allowedTools: ["slip lead", "long line", "place cot"],
    neverRecommendTools: ["prong"]
  },
  skills: [
    { name: "sit", understanding: 2, handlerHelpRequired: 1, stateOfMind: "neutral" },
    { name: "come", understanding: 1, handlerHelpRequired: 2, stateOfMind: "overexcited" }
  ],
  behaviors: [
    {
      area: "leash reactivity",
      frequency: 2,
      intensity: 2,
      recoverySpeed: 1,
      triggers: "dogs passing within 12ft",
      ownerImpact: "high"
    }
  ],
  ownerGoals: "Calm neighborhood walks and stronger recall.",
  ownerConstraints: "20 minutes per day, weekdays only.",
  homeEnvironment: "Apartment, no yard, elevator building",
  virtualSubmissions: [
    {
      taskId: "loose_leash_walk",
      mediaUrl: "https://example.com/walk.mp4",
      contextNotes: "Evening walk with moderate distractions."
    }
  ]
};

export function AssessmentForm() {
  const [payload, setPayload] = useState(defaultPayload);
  const [result, setResult] = useState<string>("No AI draft yet.");
  const [busy, setBusy] = useState(false);

  const requiresVirtualMedia = useMemo(() => payload.mode === "virtual_owner_recorded", [payload.mode]);

  async function handleSubmit() {
    setBusy(true);
    setResult("Generating draft...");
    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Request failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <h3>Assessment Intake</h3>
      <p className="muted">Choose on-site or virtual owner-recorded assessment before generating AI drafts.</p>
      <div className="grid grid-2">
        <div>
          <label>Assessment mode</label>
          <select
            value={payload.mode}
            onChange={(e) => setPayload((prev) => ({ ...prev, mode: e.target.value as AssessmentMode }))}
          >
            <option value="on_site">On-site trainer assessment</option>
            <option value="virtual_owner_recorded">Virtual owner-recorded assessment</option>
          </select>
        </div>
        <div>
          <label>Training style</label>
          <select
            value={payload.trainingStyle}
            onChange={(e) => setPayload((prev) => ({ ...prev, trainingStyle: e.target.value as TrainingStyle }))}
          >
            <option value="balanced">Balanced</option>
            <option value="force_free_r_plus">Force-free / R+</option>
            <option value="lima_evidence_based">LIMA / evidence-based</option>
            <option value="sport_working">Sport / working</option>
            <option value="behavior_consulting">Behavior consulting</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Owner goals</label>
        <textarea
          rows={3}
          value={payload.ownerGoals}
          onChange={(e) => setPayload((prev) => ({ ...prev, ownerGoals: e.target.value }))}
        />
      </div>

      {requiresVirtualMedia && (
        <div style={{ marginTop: 12 }}>
          <label>Virtual media URL</label>
          <input
            value={payload.virtualSubmissions[0]?.mediaUrl ?? ""}
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                virtualSubmissions: [
                  {
                    taskId: "loose_leash_walk",
                    mediaUrl: e.target.value,
                    contextNotes: "Owner-uploaded clip"
                  }
                ]
              }))
            }
          />
        </div>
      )}

      <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
        <button className="btn btn-primary" disabled={busy} onClick={handleSubmit}>
          {busy ? "Generating..." : "Generate AI draft"}
        </button>
        <span className="pill">Manual trainer approval required</span>
      </div>

      <pre className="card" style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}
