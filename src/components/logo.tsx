export function PackMetricLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <svg width={compact ? 28 : 36} height={compact ? 28 : 36} viewBox="0 0 36 36" aria-label="PackMetric logo">
        <rect x="2" y="2" width="32" height="32" rx="8" fill="#8EBC8A" />
        <path d="M10 24V14H14V24H10ZM16 24V10H20V24H16ZM22 24V17H26V24H22Z" fill="#1B241D" />
        <path d="M8 13L12 9H18L20 11H26V14H22L19 17H13L11 15H8V13Z" fill="#1B241D" opacity="0.85" />
      </svg>
      {!compact && (
        <div>
          <div style={{ fontWeight: 700, letterSpacing: 0.2 }}>PackMetric</div>
          <div className="muted" style={{ fontSize: 12 }}>
            Training data. Real results.
          </div>
        </div>
      )}
    </div>
  );
}
