import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [input, setInput] = useState<string>("");

  return (
    <div className="todo-list-container">
      <h1>Lista de Tarefas</h1>
      <form>
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
}

export default TodoList;
