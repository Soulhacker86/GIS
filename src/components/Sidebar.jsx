import React from "react";
import { NavLink } from "react-router-dom";

function NavButton({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "") }>
      {({ isActive }) => (
        <button className={isActive ? "active" : ""}>{children}</button>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo" />
        <h1>NEOM PM</h1>
      </div>
      <nav className="nav">
        <NavButton to="/">Dashboard</NavButton>
        <NavButton to="/portfolio">Portfolio</NavButton>
        <NavButton to="/stage-gates">Stage Gates</NavButton>
        <NavButton to="/lup">Land Use Permits</NavButton>
        <NavButton to="/bim">BIM</NavButton>
        <NavButton to="/qms">QMS</NavButton>
        <NavButton to="/tasks">Tasks</NavButton>
        <NavButton to="/admin">Admin</NavButton>
      </nav>
      <div className="small">Traceability-first PM toolkit</div>
    </aside>
  );
}
