import { TodoDTO, TodoState } from "@common/types";
import { FC } from "react";

export type TodoListOnToggle = (todo: TodoDTO) => void;

export type TodoListItemProps = {
  todo: TodoDTO;
  onToggle: TodoListOnToggle;
};

export const TodoListItem: FC<TodoListItemProps> = ({ todo, onToggle }) => {
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
        onClick={() => onToggle(todo)}
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
    </li>
  );
};

export type TodoListProps = {
  todos: TodoDTO[];
  onToggle: TodoListOnToggle;
};

export const TodoList: FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <ul className={"flex flex-col gap-2"}>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} onToggle={onToggle} todo={todo} />
      ))}
    </ul>
  );
};
