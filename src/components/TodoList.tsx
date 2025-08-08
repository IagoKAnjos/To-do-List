import { useEffect, useState } from "react";
import "../styles/TaskItem.css";
import "../styles/TodoList.css";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "completed" | "pending";

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [input, setInput] = useState<string>("");

  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    }
    const newTask: Task = {
      id: Date.now(), // Serve para gerar ID unico
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "pending") {
      return !task.completed;
    }
    return true; // Retorna todas as tarefas se o filtro for 'all'
  });

  return (
    <div className="todo-list-container">
      <h1>Lista de Tarefas</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Adicionar nova tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="filter-buttons">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "active" : ""}
        >
          Pendentes
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Concluídas
        </button>
      </div>
      <ul className="task-list">
        {/* Renderiza a lista de tarefas filtrada */}
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
          />
        ))}
      </ul>
    </div>
  );
}
