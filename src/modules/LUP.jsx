import React from "react";

const STATUSES = [
  "Draft",
  "Submitted",
  "In Progress",
  "Endorsed",
  "Code A",
  "Code B",
  "Code C",
  "Withdrawn",
  "Not Yet Applied",
  "N/A"
];

const STEPS = ["Prescreening Review", "Application Review", "LUC", "BoD"];

export default function LUP({ data, patch }) {
  const { portfolio, lup } = data;

  const ensure = (draft, projectId) => {
    draft.lup[projectId] =
      draft.lup[projectId] ?? [
        {
          id: `LUP-${projectId}-001`,
          title: "New Permit",
          area: "",
          validFrom: "",
          validTo: "",
          status: "Draft",
          step: "Prescreening Review",
          evidence: "",
          notes: ""
        }
      ];
  };

  const addPermit = (projectId) => {
    patch((draft) => {
      ensure(draft, projectId);
      const nextIndex = draft.lup[projectId].length + 1;
      draft.lup[projectId].push({
        id: `LUP-${projectId}-${String(nextIndex).padStart(3, "0")}`,
        title: "New Permit",
        area: "",
        validFrom: "",
        validTo: "",
        status: "Draft",
        step: "Prescreening Review",
        evidence: "",
        notes: ""
      });
    });
  };

  const update = (projectId, index, field, value) => {
    patch((draft) => {
      ensure(draft, projectId);
      draft.lup[projectId][index][field] = value;
    });
  };

  const remove = (projectId, index) => {
    if (!window.confirm("Delete LUP record?")) return;
    patch((draft) => {
      ensure(draft, projectId);
      draft.lup[projectId].splice(index, 1);
    });
  };

  return (
    <div>
      <h2>Land Use Permits (aligned to NUP-PRC-001)</h2>
      {portfolio.length === 0 && <div className="card small">Add a project to manage permits.</div>}
      {portfolio.map((project) => (
        <div key={project.id} className="card" style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>{project.name}</strong>
            <button className="btn secondary" onClick={() => addPermit(project.id)}>
              Add permit
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Area</th>
                <th>Valid From</th>
                <th>Valid To</th>
                <th>Status</th>
                <th>Process Step</th>
                <th>Evidence / Links</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(lup[project.id] ?? []).map((row, index) => (
                <tr key={row.id}>
                  <td className="mono">{row.id}</td>
                  <td>
                    <input
                      className="input"
                      value={row.title}
                      onChange={(event) => update(project.id, index, "title", event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      value={row.area}
                      onChange={(event) => update(project.id, index, "area", event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="date"
                      value={row.validFrom}
                      onChange={(event) => update(project.id, index, "validFrom", event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="date"
                      value={row.validTo}
                      onChange={(event) => update(project.id, index, "validTo", event.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      className="select"
                      value={row.status}
                      onChange={(event) => update(project.id, index, "status", event.target.value)}
                    >
                      {STATUSES.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="select"
                      value={row.step}
                      onChange={(event) => update(project.id, index, "step", event.target.value)}
                    >
                      {STEPS.map((step) => (
                        <option key={step}>{step}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      className="input"
                      placeholder="SharePoint / EDMS link"
                      value={row.evidence}
                      onChange={(event) => update(project.id, index, "evidence", event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      value={row.notes}
                      onChange={(event) => update(project.id, index, "notes", event.target.value)}
                    />
                  </td>
                  <td>
                    <button className="btn secondary" onClick={() => remove(project.id, index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
