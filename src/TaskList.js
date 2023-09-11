import { useState } from "react";

export default function TaskList({
  todos,
  selectedTodo,
  onChangeTodo,
  onDeleteTodo,
  onSetSelectTodo
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task
            todo={todo}
            selectedTodo={selectedTodo}
            onChangeTodo={onChangeTodo}
            onDeleteTodo={onDeleteTodo}
            onSetSelectTodo={onSetSelectTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({
  todo,
  selectedTodo,
  onChangeTodo,
  onDeleteTodo,
  onSetSelectTodo
}) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => {
            onChangeTodo({
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
            if (todo.id === selectedTodo) {
              setIsEditing(true);
            }
          }}
          disabled={todo.id !== selectedTodo}
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
        checked={todo.id === selectedTodo}
        onChange={(e) => {
          onSetSelectTodo(e.target.checked ? todo.id : null);
        }}
      />
      {todoContent}
      <button
        onClick={() => {
          if (todo.id === selectedTodo) {
            onDeleteTodo(todo.id);
          }
        }}
        disabled={todo.id !== selectedTodo}
      >
        Delete
      </button>
    </label>
  );
}

