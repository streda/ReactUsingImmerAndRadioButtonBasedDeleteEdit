import { useState } from "react";

export default function TaskList({
  todos,
  selectTodo,
  onChangeTodo,
  onDeleteTodo,
  onSelectTodo
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task
            todo={todo}
            selectTodo={selectTodo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
            onSelectTodo={onSelectTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, selectTodo, onChange, onDelete, onSelectTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button
          onClick={() => {
            if (todo.id === selectTodo) {
              setIsEditing(true);
            }
          }}
          disabled={todo.id !== selectTodo}
        >
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.id === selectTodo}
        onChange={(e) => {
          onSelectTodo(e.target.checked ? todo.id : null);
        }}
      />
      {todoContent}
      <button
        onClick={() => {
          if (todo.id === selectTodo) {
            onDelete(todo.id);
          }
        }}
        disabled={todo.id !== selectTodo}
      >
        Delete
      </button>
    </label>
  );
}
