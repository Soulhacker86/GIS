import React, { useState } from "react";

export default function Admin({ data, patch }) {
  const { settings } = data;
  const [disciplineInput, setDisciplineInput] = useState("");
  const [sectorInput, setSectorInput] = useState("");

  const addDiscipline = () => {
    if (!disciplineInput.trim()) return;
    patch((draft) => {
      draft.settings.disciplines.push(disciplineInput.trim());
    });
    setDisciplineInput("");
  };

  const removeDiscipline = (index) => {
    patch((draft) => {
      draft.settings.disciplines.splice(index, 1);
    });
  };

  const addSector = () => {
    if (!sectorInput.trim()) return;
    patch((draft) => {
      draft.settings.lupSectors.push(sectorInput.trim());
    });
    setSectorInput("");
  };

  const removeSector = (index) => {
    patch((draft) => {
      draft.settings.lupSectors.splice(index, 1);
    });
  };

  return (
    <div className="grid2">
      <div className="card">
        <h2>Disciplines</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <input
            className="input"
            placeholder="Add discipline"
            value={disciplineInput}
            onChange={(event) => setDisciplineInput(event.target.value)}
          />
          <button className="btn" onClick={addDiscipline}>
            Add
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
          {settings.disciplines.map((discipline, index) => (
            <li key={discipline} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{discipline}</span>
              <button className="btn secondary" onClick={() => removeDiscipline(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h2>LUP Review Sectors</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <input
            className="input"
            placeholder="Add sector"
            value={sectorInput}
            onChange={(event) => setSectorInput(event.target.value)}
          />
          <button className="btn" onClick={addSector}>
            Add
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
          {settings.lupSectors.map((sector, index) => (
            <li key={sector} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{sector}</span>
              <button className="btn secondary" onClick={() => removeSector(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
