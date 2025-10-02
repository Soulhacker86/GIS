import React from "react";

const STATUS = ["Open", "In Progress", "Blocked", "Done", "N/A"];

export default function Tasks({ data, patch }) {
  const { tasks, portfolio, settings } = data;

  const addTask = () => {
    patch((draft) => {
      const nextId = `T-${String(draft.tasks.length + 1).padStart(3, "0")}`;
      draft.tasks.push({
        id: nextId,
        projectId: portfolio[0]?.id ?? "",
        title: "New Task",
        discipline: settings.disciplines[0] ?? "",
        due: "",
        status: "Open"
      });
    });
  };

  const update = (index, field, value) => {
    patch((draft) => {
      draft.tasks[index][field] = value;
    });
  };

  const remove = (index) => {
    patch((draft) => {
      draft.tasks.splice(index, 1);
    });
  };

  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Custom Tasks</h2>
        <button className="btn" onClick={addTask}>
          Add task
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Title</th>
            <th>Discipline</th>
            <th>Due</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td className="mono">{task.id}</td>
              <td>
                <select
                  className="select"
                  value={task.projectId}
                  onChange={(event) => update(index, "projectId", event.target.value)}
                >
                  <option value="">—</option>
                  {portfolio.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  className="input"
                  value={task.title}
                  onChange={(event) => update(index, "title", event.target.value)}
                />
              </td>
              <td>
                <select
                  className="select"
                  value={task.discipline}
                  onChange={(event) => update(index, "discipline", event.target.value)}
                >
                  {settings.disciplines.map((discipline) => (
                    <option key={discipline}>{discipline}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  className="input"
                  type="date"
                  value={task.due}
                  onChange={(event) => update(index, "due", event.target.value)}
                />
              </td>
              <td>
                <select
                  className="select"
                  value={task.status}
                  onChange={(event) => update(index, "status", event.target.value)}
                >
                  {STATUS.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="btn secondary" onClick={() => remove(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
