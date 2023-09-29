import { TodoDTO, TodoState } from "@common/types";
import { FC } from "react";

import { TodoList } from "./components/todos/list";

const todos: TodoDTO[] = [
  {
    id: "1",
    title: "Todo 1",
    state: TodoState.TODO,
  },
  {
    id: "2",
    title: "Todo 2",
    state: TodoState.DONE,
  },
];

export const App: FC = () => {
  return (
    <main className={"flex min-h-screen items-center"}>
      <div className={"mx-auto w-full max-w-6xl"}>
        <TodoList todos={todos} />
      </div>
    </main>
  );
};
