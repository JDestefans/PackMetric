import { PackMetricLogo } from "@/components/logo";

export default function ClientPage() {
  return (
    <main className="grid">
      <header className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PackMetricLogo compact />
        <span className="pill">Client portal</span>
      </header>

      <section className="grid grid-2">
        <article className="card">
          <h3>Today&apos;s Training</h3>
          <p className="muted">Objective: calm leash transitions and clean recall reps in low distraction.</p>
          <p>Homework: 2x 10-minute sessions, reward calm check-ins, avoid crowded dog paths.</p>
        </article>

        <article className="card">
          <h3>Progress Timeline</h3>
          <ul className="muted">
            <li>Day 1: Engagement baseline logged</li>
            <li>Day 2: Loose leash improvement to 68%</li>
            <li>Day 3: Faster recovery after trigger exposure</li>
          </ul>
        </article>
      </section>

      <section className="card">
        <h3>Trainer Profile</h3>
        <p className="muted">
          Style: Balanced | Services: board-and-train, private lessons, virtual coaching.
        </p>
        <p className="muted">
          Philosophy: clear communication, fair criteria, and real-world reliability with owner follow-through.
        </p>
      </section>
    </main>
  );
}
