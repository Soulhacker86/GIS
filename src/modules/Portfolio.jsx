import React, { useState } from "react";
import MiniMap from "../components/MiniMap.jsx";

const STAGES = ["Stage 1", "Stage 2", "Stage 3", "Stage 4A", "Stage 4B"];

export default function Portfolio({ data, patch }) {
  const { portfolio } = data;
  const [selected, setSelected] = useState(portfolio[0]?.id ?? null);

  const addProject = () => {
    patch((draft) => {
      const nextId = `P-${String(draft.portfolio.length + 1).padStart(3, "0")}`;
      draft.portfolio.push({
        id: nextId,
        name: "New Project",
        stage: "Stage 1",
        manager: "",
        status: "Mobilization",
        progress: 0,
        lat: 27.5,
        lon: 36.5
      });
      setSelected(nextId);
    });
  };

  const removeProject = (id) => {
    if (!window.confirm("Delete project and related registers?")) return;
    patch((draft) => {
      draft.portfolio = draft.portfolio.filter((project) => project.id !== id);
      delete draft.stages[id];
      delete draft.lup[id];
      delete draft.bim[id];
      delete draft.qms[id];
      draft.tasks = draft.tasks.filter((task) => task.projectId !== id);
      draft.risks = draft.risks.filter((risk) => risk.projectId !== id);
    });
    setSelected((prev) => (prev === id ? null : prev));
  };

  const update = (index, field, value) => {
    patch((draft) => {
      draft.portfolio[index][field] = value;
    });
  };

  const selectedProject = portfolio.find((project) => project.id === selected) ?? portfolio[0];

  return (
    <div className="grid2">
      <div className="card" style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Portfolio</h2>
          <button className="btn" onClick={addProject}>
            Add project
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Stage</th>
              <th>Manager</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Lat</th>
              <th>Lon</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((project, index) => (
              <tr
                key={project.id}
                onClick={() => setSelected(project.id)}
                style={{ background: selected === project.id ? "rgba(34, 211, 238, 0.08)" : undefined }}
              >
                <td className="mono">{project.id}</td>
                <td>
                  <input
                    className="input"
                    value={project.name}
                    onChange={(event) => update(index, "name", event.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="select"
                    value={project.stage}
                    onChange={(event) => update(index, "stage", event.target.value)}
                  >
                    {STAGES.map((stage) => (
                      <option key={stage}>{stage}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    className="input"
                    value={project.manager ?? ""}
                    onChange={(event) => update(index, "manager", event.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    value={project.status ?? ""}
                    onChange={(event) => update(index, "status", event.target.value)}
                  />
                </td>
                <td style={{ width: 110 }}>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    max="100"
                    value={project.progress ?? 0}
                    onChange={(event) => update(index, "progress", Number(event.target.value))}
                  />
                </td>
                <td style={{ width: 110 }}>
                  <input
                    className="input"
                    type="number"
                    value={project.lat}
                    onChange={(event) => update(index, "lat", Number(event.target.value))}
                  />
                </td>
                <td style={{ width: 110 }}>
                  <input
                    className="input"
                    type="number"
                    value={project.lon}
                    onChange={(event) => update(index, "lon", Number(event.target.value))}
                  />
                </td>
                <td>
                  <button className="btn secondary" onClick={() => removeProject(project.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <MiniMap
          center={selectedProject ? [selectedProject.lat, selectedProject.lon] : [27.5, 36.5]}
          markers={portfolio}
        />
        <div className="card">
          <h3>Selected Project</h3>
          {selectedProject ? (
            <div className="small" style={{ display: "grid", gap: 6 }}>
              <strong>{selectedProject.name}</strong>
              <span>Stage: {selectedProject.stage}</span>
              <span>Manager: {selectedProject.manager || "—"}</span>
              <span>Progress: {selectedProject.progress ?? 0}%</span>
              <span>Status: {selectedProject.status || "—"}</span>
            </div>
          ) : (
            <div className="small">Select a project to see details.</div>
          )}
        </div>
      </div>
    </div>
  );
}
