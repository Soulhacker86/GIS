import React from "react";

const FIELDS = [
  { key: "mobilization", label: "Mobilization" },
  { key: "pqd", label: "Project Quality Dossier" },
  { key: "methodStatements", label: "Method Statements" },
  { key: "ehs", label: "EHS" },
  { key: "orgChart", label: "Organization Chart" },
  { key: "etsd", label: "ETSD" },
  { key: "pts", label: "PTS" }
];

const STATUS = ["Not Started", "In Progress", "Submitted", "Approved", "N/A"];

export default function QMS({ data, patch }) {
  const { portfolio, qms } = data;

  const ensure = (draft, projectId, key) => {
    draft.qms[projectId] = draft.qms[projectId] ?? {};
    draft.qms[projectId][key] =
      draft.qms[projectId][key] ?? {
        status: "Not Started",
        date: "",
        link: ""
      };
  };

  const update = (projectId, key, field, value) => {
    patch((draft) => {
      ensure(draft, projectId, key);
      draft.qms[projectId][key][field] = value;
    });
  };

  return (
    <div>
      <h2>Quality Records (PRC-029 / PRC-005)</h2>
      {portfolio.length === 0 && <div className="card small">Add a project to begin.</div>}
      {portfolio.map((project) => (
        <div key={project.id} className="card" style={{ marginTop: 18 }}>
          <strong>{project.name}</strong>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Status</th>
                <th>Date</th>
                <th>SharePoint / EDMS Link</th>
              </tr>
            </thead>
            <tbody>
              {FIELDS.map((field) => {
                const row = qms[project.id]?.[field.key] ?? {
                  status: "Not Started",
                  date: "",
                  link: ""
                };
                return (
                  <tr key={field.key}>
                    <td>{field.label}</td>
                    <td>
                      <select
                        className="select"
                        value={row.status}
                        onChange={(event) => update(project.id, field.key, "status", event.target.value)}
                      >
                        {STATUS.map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        className="input"
                        type="date"
                        value={row.date}
                        onChange={(event) => update(project.id, field.key, "date", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="input"
                        placeholder="SharePoint link"
                        value={row.link}
                        onChange={(event) => update(project.id, field.key, "link", event.target.value)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
