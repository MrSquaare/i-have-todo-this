import { TodoDTO } from "@common/types";
import { FC } from "react";

export type TodoListItemProps = {
  todo: TodoDTO;
};

export const TodoListItem: FC<TodoListItemProps> = ({ todo }) => {
  return (
    <li
      className={
        "relative flex items-center rounded-xl border border-neutral-300 bg-neutral-100"
      }
    >
      <input
        className={
          "peer absolute left-4 h-6 w-6 rounded-md border-neutral-300 bg-white"
        }
        data-testid={"todo-checkbox"}
        id={`todo-checkbox-${todo.id}`}
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
};

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <ul className={"flex flex-col gap-2"}>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
