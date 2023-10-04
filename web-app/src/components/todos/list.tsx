import { TodoDTO, TodoState } from "@common/types";
import { Info } from "@phosphor-icons/react";
import { FC } from "react";

import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";

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
      <Tooltip content={"Details"}>
        <Button
          className={"absolute right-4"}
          data-testid={"todo-details"}
          onClick={() => onDetailsClick(todo)}
          variant={"light"}
        >
          <Info />
        </Button>
      </Tooltip>
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
  return (
    <ul className={"flex flex-col gap-2"} data-testid={"todo-list"}>
      {todos.map((todo) => (
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
