/**
 * Purpose:
 * Alternative to useState for managing complex state logic with multiple sub-values or
 * when state updates depend on previous state.
 *
 * Key Concepts:
 *
 * Accepts a reducer function and initial state
 * Returns current state and a dispatch function
 * Similar to Redux pattern but for component-level state
 * Better for complex state transitions than multiple useState calls
 *
 *
 * When to use:
 *
 * Managing state with multiple sub-values
 * Complex state logic with many transitions
 * State updates that depend on previous state
 * When you need predictable state management pattern
 */

import React, { useCallback, useMemo, useReducer, useState } from "react";

const ACTIONS = {
  ADD: "add-todo",
  TOGGLE: "toggle",
  DELETE: "delete",
};

const intialState = [];

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      );
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
};

const newTodo = (name) => {
  return {
    id: Date.now(),
    name: name,
    isComplete: false,
  };
};

const Todos = React.memo((props) => {
  const { todo, handleToggle, handleDelete } = props;

  return (
    <div>
      <span style={{ color: todo.isComplete ? "#AAA" : "#000" }}>
        {todo.name}
      </span>
      <button onClick={() => handleToggle(todo.id)}>Toggle</button>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
});

const Reducer = () => {
  const [todos, dispatch] = useReducer(reducer, intialState);
  const [name, setName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") return;

    dispatch({
      type: ACTIONS.ADD,
      payload: { name },
    });
    setName("");
  };

  const filterTasks = useMemo(() => {
    if (isCompleted) {
      return todos.filter((todo) => todo.isComplete);
    }
    return todos;
  }, [todos, isCompleted]);

  const handleToggle = useCallback(
    (id) => {
      dispatch({
        type: ACTIONS.TOGGLE,
        payload: { id },
      });
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch({
        type: ACTIONS.DELETE,
        payload: { id },
      });
    },
    [dispatch]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a todo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <label>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        {isCompleted ? "Clear Filter" : "Show Completed"}
      </label>

      {isCompleted && filterTasks.length === 0 ? (
        <p>No Completed Tasks to show.</p>
      ) : (
        (isCompleted ? filterTasks : todos).map((todo) => (
          <Todos
            key={todo.id}
            todo={todo}
            handleToggle={() => handleToggle(todo.id)}
            handleDelete={() => handleDelete(todo.id)}
          />
        ))
      )}
    </div>
  );
};

export default Reducer;
