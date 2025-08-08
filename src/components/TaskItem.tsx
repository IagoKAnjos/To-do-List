import React, { useState } from "react";

interface TaskItemProps {
  task: {
    id: number;
    text: string;
    completed: boolean;
  };
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onToggle,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (newText.trim() !== "") {
      onEdit(task.id, newText);
      setIsEditing(false); // Sai do modo de edição.
    }
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit} // Salva ao perder o foco.
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEdit();
            }
          }}
        />
      ) : (
        <span onClick={() => onToggle(task.id)}>{task.text}</span>
      )}
      <div className="task-actions">
        {isEditing ? (
          <button onClick={handleEdit}>Salvar</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => onDelete(task.id)}>Deletar</button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
