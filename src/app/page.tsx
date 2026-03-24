import Link from "next/link";
import { PackMetricLogo } from "@/components/logo";

export default function HomePage() {
  return (
    <main className="grid">
      <header className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PackMetricLogo />
        <span className="pill">Phase 1+2 starter build</span>
      </header>

      <section className="grid grid-2">
        <div className="card">
          <h2>Trainer Workspace</h2>
          <p className="muted">
            Style-aware assessments, AI draft plans, and mandatory trainer approvals before client publishing.
          </p>
          <Link className="btn btn-primary" href="/trainer">
            Open Trainer Dashboard
          </Link>
        </div>
        <div className="card">
          <h2>Client Portal</h2>
          <p className="muted">Owner-facing progress timeline with trainer-approved summaries and homework plan.</p>
          <Link className="btn" href="/client">
            Open Client View
          </Link>
        </div>
      </section>

      <section className="card">
        <h3>Logo System (shirt-ready concept)</h3>
        <p className="muted">
          Geometric badge with metric bars + canine silhouette, high-contrast and stitch-safe at small sizes.
        </p>
      </section>
    </main>
  );
}
