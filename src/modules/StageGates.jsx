import React from "react";

const STAGES = ["Stage 1", "Stage 2", "Stage 3", "Stage 4A", "Stage 4B"];
const DEFAULT_ITEMS = [
  "Scope defined",
  "Compliance checked",
  "QA review complete",
  "SEM comments logged",
  "Approvals received"
];

export default function StageGates({ data, patch }) {
  const { portfolio, stages } = data;

  const ensureStage = (draft, projectId, stage) => {
    draft.stages[projectId] = draft.stages[projectId] ?? {};
    draft.stages[projectId][stage] =
      draft.stages[projectId][stage] ??
      DEFAULT_ITEMS.map((name) => ({
        name,
        status: "Pending",
        owner: "",
        remarks: ""
      }));
  };

  const update = (projectId, stage, index, field, value) => {
    patch((draft) => {
      ensureStage(draft, projectId, stage);
      draft.stages[projectId][stage][index][field] = value;
    });
  };

  const addChecklistItem = (projectId, stage) => {
    const name = window.prompt("Checklist item name");
    if (!name) return;
    patch((draft) => {
      ensureStage(draft, projectId, stage);
      draft.stages[projectId][stage].push({
        name,
        status: "Pending",
        owner: "",
        remarks: ""
      });
    });
  };

  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <h2>Stage Gate Reviews</h2>
      {portfolio.length === 0 && <div className="small">Add a project to begin.</div>}
      {portfolio.map((project) => (
        <section key={project.id} style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>{project.name}</strong>
              <span className="badge" style={{ marginLeft: 12 }}>
                {project.stage}
              </span>
            </div>
          </div>
          {STAGES.map((stage) => {
            const rows = stages[project.id]?.[stage];
            return (
              <div key={stage} className="card" style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0 }}>{stage}</h3>
                  <button className="btn secondary" onClick={() => addChecklistItem(project.id, stage)}>
                    Add item
                  </button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Status</th>
                      <th>Owner</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(rows ?? DEFAULT_ITEMS.map((name) => ({ name, status: "Pending", owner: "", remarks: "" }))).map(
                      (row, index) => (
                        <tr key={index}>
                          <td>{row.name}</td>
                          <td>
                            <select
                              className="select"
                              value={row.status}
                              onChange={(event) => update(project.id, stage, index, "status", event.target.value)}
                            >
                              {[
                                "Pending",
                                "In Review",
                                "Approved",
                                "Rejected",
                                "N/A"
                              ].map((status) => (
                                <option key={status}>{status}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              className="input"
                              value={row.owner ?? ""}
                              onChange={(event) => update(project.id, stage, index, "owner", event.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              className="input"
                              value={row.remarks ?? ""}
                              onChange={(event) => update(project.id, stage, index, "remarks", event.target.value)}
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
