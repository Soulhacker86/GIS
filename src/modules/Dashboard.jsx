import React, { useMemo } from "react";

function KpiCard({ label, value, suffix = "%" }) {
  const percent = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        <span className="small">
          {percent}
          {suffix}
        </span>
      </div>
      <div className="kpi" style={{ marginTop: 12 }}>
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function StageDistribution({ projects }) {
  const counts = useMemo(() => {
    const tally = new Map();
    projects.forEach((project) => {
      tally.set(project.stage, (tally.get(project.stage) ?? 0) + 1);
    });
    return Array.from(tally.entries()).sort();
  }, [projects]);

  return (
    <div className="card">
      <h3>Stage Distribution</h3>
      {counts.length === 0 ? (
        <div className="small">No projects registered.</div>
      ) : (
        <div>
          {counts.map(([stage, count]) => (
            <div key={stage} style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{stage}</strong>
                <span className="small">{count} project(s)</span>
              </div>
              <div className="kpi" style={{ marginTop: 6 }}>
                <span style={{ width: `${Math.min(100, count * 20)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RiskSpark({ risks }) {
  const max = Math.max(...risks.map((r) => r.exposure), 0) || 1;
  return (
    <svg viewBox="0 0 400 120" style={{ width: "100%", height: 120 }}>
      <defs>
        <linearGradient id="riskGradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#f87171" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#riskGradient)"
        strokeWidth="4"
        points={risks
          .map((risk, index) => {
            const x = (index / Math.max(risks.length - 1, 1)) * 360 + 20;
            const y = 100 - (risk.exposure / max) * 80;
            return `${x},${y}`;
          })
          .join(" ")}
      />
      {risks.map((risk, index) => {
        const x = (index / Math.max(risks.length - 1, 1)) * 360 + 20;
        const y = 100 - (risk.exposure / max) * 80;
        return (
          <g key={risk.id}>
            <circle cx={x} cy={y} r={6} fill="#22d3ee" />
            <text x={x} y={110} fill="#94a3b8" fontSize="10" textAnchor="middle">
              {risk.projectId}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Dashboard({ data }) {
  const { portfolio, tasks, risks } = data;
  const portfolioCount = portfolio.length;
  const averageProgress =
    portfolioCount === 0
      ? 0
      : Math.round(portfolio.reduce((sum, item) => sum + (item.progress ?? 0), 0) / portfolioCount);
  const mobilization = Math.round(
    portfolio.reduce((sum, item) => sum + (item.progress ?? 0), 0) / Math.max(portfolioCount, 1)
  );
  const checklistCompletion = tasks.length === 0 ? 0 : Math.round((tasks.filter((t) => t.status === "Done").length / tasks.length) * 100);

  return (
    <div className="grid3">
      <KpiCard label={`Active Projects (${portfolioCount})`} value={100} />
      <KpiCard label="Average Progress" value={averageProgress} />
      <KpiCard label="Mobilization" value={mobilization} />
      <KpiCard label="Task Closure" value={checklistCompletion} />

      <StageDistribution projects={portfolio} />

      <div className="card">
        <h3>Risk Exposure</h3>
        {risks.length === 0 ? (
          <div className="small">No risks logged yet.</div>
        ) : (
          <RiskSpark risks={risks} />
        )}
      </div>
    </div>
  );
}
