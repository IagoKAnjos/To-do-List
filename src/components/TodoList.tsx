import { useEffect, useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [input, setInput] = useState<string>("");

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
    e.preventDefault(); // Impede o recarregamento da página.
    if (input.trim() === "") {
      // Impede a adição de tarefas vazias.
      return;
    }
    const newTask: Task = {
      id: Date.now(), // Serve para gerar ID unico
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");

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
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      </div>
    );
  };
}
