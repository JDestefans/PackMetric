import { AssessmentForm } from "@/components/assessment-form";
import { ReviewQueue } from "@/components/review-queue";
import { PackMetricLogo } from "@/components/logo";

export default function TrainerPage() {
  return (
    <main className="grid">
      <header className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PackMetricLogo compact />
        <span className="pill">Trainer mode</span>
      </header>

      <section className="grid grid-2">
        <div className="card">
          <h3>CRM Snapshot</h3>
          <p className="muted">Leads: 6 | Active: 14 | Completed: 31 | Follow-up: 9</p>
          <p className="muted">Next step: wire real Supabase tables + row-level security.</p>
        </div>
        <div className="card">
          <h3>Program Templates</h3>
          <p className="muted">
            Starter templates: 10-day board-and-train, 6 lesson package, behavior reset track.
          </p>
          <p className="muted">Next step: persist template instances per dog timeline.</p>
        </div>
      </section>

      <AssessmentForm />
      <ReviewQueue />
    </main>
  );
}
