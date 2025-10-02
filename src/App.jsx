import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./modules/Dashboard.jsx";
import Portfolio from "./modules/Portfolio.jsx";
import StageGates from "./modules/StageGates.jsx";
import LUP from "./modules/LUP.jsx";
import BIM from "./modules/BIM.jsx";
import QMS from "./modules/QMS.jsx";
import Tasks from "./modules/Tasks.jsx";
import Admin from "./modules/Admin.jsx";
import { useStore } from "./store.js";

export default function App() {
  const store = useStore();
  const [data, setData] = useState(store.get());

  useEffect(() => store.subscribe(setData), [store]);

  const patch = (fn) => store.patch(fn);

  const handleExport = () => {
    const blob = new Blob([store.export()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "neom_pm_workspace.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        store.import(reader.result);
      } catch (error) {
        console.error(error);
        window.alert("Unable to import file. Please check the JSON structure.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <div className="app">
      <Sidebar />
      <main>
        <header className="header">
          <div className="right">
            <span className="badge">Local autosave enabled</span>
          </div>
          <div className="right">
            <label className="btn secondary">
              Import JSON
              <input
                type="file"
                accept="application/json"
                onChange={handleImport}
                style={{ display: "none" }}
              />
            </label>
            <button className="btn" onClick={handleExport}>
              Export
            </button>
          </div>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard data={data} patch={patch} />} />
            <Route path="/portfolio" element={<Portfolio data={data} patch={patch} />} />
            <Route path="/stage-gates" element={<StageGates data={data} patch={patch} />} />
            <Route path="/lup" element={<LUP data={data} patch={patch} />} />
            <Route path="/bim" element={<BIM data={data} patch={patch} />} />
            <Route path="/qms" element={<QMS data={data} patch={patch} />} />
            <Route path="/tasks" element={<Tasks data={data} patch={patch} />} />
            <Route path="/admin" element={<Admin data={data} patch={patch} />} />
          </Routes>
        </div>
        <footer className="footer">
          <span>© {new Date().getFullYear()} NEOM PM Workspace</span>
        </footer>
      </main>
    </div>
  );
}
