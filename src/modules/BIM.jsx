import React from "react";

const DELIVERABLE_TYPES = [
  "CAD",
  "BIM",
  "IFC",
  "Navisworks",
  "Clash",
  "Compliance",
  "Comments"
];

const STATUSES = ["Not Started", "In Progress", "Submitted", "Approved", "N/A"];

export default function BIM({ data, patch }) {
  const { portfolio, settings, bim } = data;

  const ensure = (draft, projectId, discipline, type) => {
    draft.bim[projectId] = draft.bim[projectId] ?? {};
    draft.bim[projectId][discipline] = draft.bim[projectId][discipline] ?? {};
    draft.bim[projectId][discipline][type] =
      draft.bim[projectId][discipline][type] ?? {
        status: "Not Started",
        link: "",
        comments: ""
      };
  };

  const update = (projectId, discipline, type, field, value) => {
    patch((draft) => {
      ensure(draft, projectId, discipline, type);
      draft.bim[projectId][discipline][type][field] = value;
    });
  };

  return (
    <div>
      <h2>BIM Deliverables (PRC-005 reference)</h2>
      {portfolio.length === 0 && <div className="card small">Add a project to begin.</div>}
      {portfolio.map((project) => (
        <section key={project.id} className="card" style={{ marginTop: 18 }}>
          <strong>{project.name}</strong>
          {settings.disciplines.map((discipline) => (
            <div key={discipline} className="card" style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>{discipline}</h3>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Deliverable</th>
                    <th>Status</th>
                    <th>SharePoint / EDMS link</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {DELIVERABLE_TYPES.map((type) => {
                    const cell = bim[project.id]?.[discipline]?.[type] ?? {
                      status: "Not Started",
                      link: "",
                      comments: ""
                    };
                    return (
                      <tr key={type}>
                        <td>{type}</td>
                        <td>
                          <select
                            className="select"
                            value={cell.status}
                            onChange={(event) => update(project.id, discipline, type, "status", event.target.value)}
                          >
                            {STATUSES.map((status) => (
                              <option key={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            className="input"
                            placeholder="https://..."
                            value={cell.link}
                            onChange={(event) => update(project.id, discipline, type, "link", event.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            className="input"
                            value={cell.comments}
                            onChange={(event) => update(project.id, discipline, type, "comments", event.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
