import { useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

const starterTasks = [
  { id: crypto.randomUUID(), title: "Read the Module 2 lesson", completed: false },
  { id: crypto.randomUUID(), title: "Create a React component", completed: true },
];

export default function App() {
  const [tasks, setTasks] = useState(starterTasks);

  function addTask(title) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;

  return (
    <main className="app-shell">
      <section className="app-card" aria-labelledby="page-title">
        <header className="app-header">
          <p className="eyebrow">INEW-2434 | Module 2</p>
          <h1 id="page-title">React Task Tracker</h1>
          <p>Practice components, props, state, events, forms, and lists.</p>
        </header>

        <TaskForm onAddTask={addTask} />

        <section className="summary" aria-label="Task summary">
          <span>{activeCount} active</span>
          <span>{completedCount} completed</span>
          <span>{tasks.length} total</span>
        </section>

        <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
      </section>
    </main>
  );
}
