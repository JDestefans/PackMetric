"use client";

import { useState } from "react";

type AssessmentRow = {
  id: string;
  input: { mode: string; trainingStyle: string; dogId: string };
  aiDraft?: { summary: string; confidence: string; recommendedPlan: { title: string } };
  trainerDecision?: "approved" | "edited" | "rejected";
  updatedAt: string;
};

export function ReviewQueue() {
  const [rows, setRows] = useState<AssessmentRow[]>([]);
  const [status, setStatus] = useState("Not loaded");

  async function loadQueue() {
    setStatus("Loading...");
    const response = await fetch("/api/assessment/list");
    const data = await response.json();
    setRows(data.assessments ?? []);
    setStatus(`Loaded ${data.assessments?.length ?? 0} assessment(s)`);
  }

  async function approve(assessmentId: string) {
    const response = await fetch("/api/assessment/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assessmentId,
        decision: "approved",
        trainerDecisionNotes: "Approved by trainer."
      })
    });
    if (response.ok) {
      await loadQueue();
    }
  }

  return (
    <div className="card">
      <h3>Trainer Review Queue</h3>
      <p className="muted">AI drafts stay pending until a trainer manually approves, edits, or rejects.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button className="btn" onClick={loadQueue}>
          Refresh queue
        </button>
        <span className="pill">{status}</span>
      </div>

      <div className="grid">
        {rows.map((row) => (
          <div key={row.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{row.id.slice(0, 8)}</strong>
              <span className="pill">{row.input.mode}</span>
            </div>
            <p className="muted" style={{ marginTop: 8 }}>
              Style: {row.input.trainingStyle} | Dog: {row.input.dogId}
            </p>
            <p>{row.aiDraft?.summary ?? "No draft generated yet."}</p>
            <p className="muted">Confidence: {row.aiDraft?.confidence ?? "n/a"}</p>
            <p className="muted">Decision: {row.trainerDecision ?? "pending"}</p>
            {!row.trainerDecision && row.aiDraft && (
              <button className="btn btn-primary" onClick={() => approve(row.id)}>
                Approve Draft
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
