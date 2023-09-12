// import { useState } from 'react';
import { useImmer } from "use-immer";
import AddTodo from "./AddTodo.js";
import TaskList from "./TaskList.js";

let nextId = 3;
const initialTodos = [
  { id: 0, title: "Buy milk", done: true },
  { id: 1, title: "Eat tacos", done: false },
  { id: 2, title: "Brew tea", done: false }
];

export default function TaskApp() {
  const [todos, setTodos] = useImmer(initialTodos);
  const [selectedTodo, setSelectedTodo] = useImmer(null);

  function handleAddTodo(title) {
    if (title.trim() === "") {
      return;
    }
    setTodos((draft) => {
      draft.push({
        id: nextId,
        title: title.trim(),
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    setTodos((draft) => {
      const todo = draft.find((element) => element.id === nextTodo.id);
      if (todo) {
        todo.title = nextTodo.title;
        todo.done = nextTodo.done;
      }
    });
  }

  function handleDeleteTodo(todoId) {
    setTodos((draft) => {
      const index = draft.findIndex((newIndex) => {
        return newIndex.id === todoId;
      });
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });

     setSelectedTodo(null);

    
    // const index = todos.findIndex((t) => t.id === todoId);
    // todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        selectedTodo={selectedTodo}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
        onSetSelectTodo={setSelectedTodo}
      />
    </>
  );
}
