import { TodoDTO, TodoState } from "@common/types";
import { FC, useMemo } from "react";

export type TodoListOnToggle = (todo: TodoDTO) => void;
export type TodoListOnDetailsClick = (todo: TodoDTO) => void;

export type TodoListItemProps = {
  todo: TodoDTO;
  onToggle: TodoListOnToggle;
  onDetailsClick: TodoListOnDetailsClick;
};

export const TodoListItem: FC<TodoListItemProps> = ({
  todo,
  onToggle,
  onDetailsClick,
}) => {
  return (
    <li
      className={
        "relative flex items-center rounded-xl border border-neutral-300 bg-neutral-100"
      }
    >
      <input
        checked={todo.state === TodoState.DONE}
        className={
          "peer absolute left-4 h-6 w-6 rounded-md border-neutral-300 bg-white"
        }
        data-testid={"todo-checkbox"}
        id={`todo-checkbox-${todo.id}`}
        onChange={() => onToggle(todo)}
        type={"checkbox"}
      />
      <label
        className={
          "w-full p-4 pl-12 text-xl font-medium peer-checked:line-through"
        }
        data-testid={"todo-label"}
        htmlFor={`todo-checkbox-${todo.id}`}
      >
        {todo.title}
      </label>
      <button
        className={
          "absolute right-4 rounded-full border border-neutral-300 bg-white px-4 py-2 hover:bg-neutral-100"
        }
        data-testid={"todo-details"}
        onClick={() => onDetailsClick(todo)}
      >
        Details
      </button>
    </li>
  );
};

export type TodoListProps = {
  todos: TodoDTO[];
  onToggle: TodoListOnToggle;
  onDetailsClick: TodoListOnDetailsClick;
};

export const TodoList: FC<TodoListProps> = ({
  todos,
  onToggle,
  onDetailsClick,
}) => {
  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      return a.state - b.state;
    });
  }, [todos]);

  return (
    <ul className={"flex flex-col gap-2"}>
      {sortedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          onDetailsClick={onDetailsClick}
          onToggle={onToggle}
          todo={todo}
        />
      ))}
    </ul>
  );
};
