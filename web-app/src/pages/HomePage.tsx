import { DotsThree } from "@phosphor-icons/react";
import { FC, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { fetchTodos, toggleTodo } from "../api/todos";
import { TodoList, TodoListOnToggle } from "../components/todos/list";
import { useError } from "../hooks/useError";

export const HomePage: FC = () => {
  const queryClient = useQueryClient();
  const { data: todos, error: todosError } = useQuery("todos", fetchTodos);
  const { mutate: toggleTodoMutate, error: toggleTodoError } = useMutation(
    toggleTodo,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("todos");
      },
    },
  );

  const { globalError } = useError(todosError ?? toggleTodoError);

  const onToggle = useCallback<TodoListOnToggle>(
    (todo) => {
      toggleTodoMutate(todo.id);
    },
    [toggleTodoMutate],
  );

  return (
    <main className={"flex min-h-screen items-center"}>
      <div className={"mx-auto w-full max-w-6xl"}>
        {globalError ? (
          <div
            className={
              "mb-4 flex items-center rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800"
            }
            role={"alert"}
          >
            <p className={"font-medium"} data-testid={"error"}>
              {globalError}
            </p>
          </div>
        ) : !todos ? (
          <div className={"flex h-96 items-center justify-center"}>
            <DotsThree
              className={"h-12 w-12 animate-bounce"}
              data-testid={"spinner"}
            />
          </div>
        ) : !todos.length ? (
          <div className={"flex h-96 items-center justify-center"}>
            <p className={"text-2xl"} data-testid={"empty"}>
              No todo list
            </p>
          </div>
        ) : (
          <TodoList onToggle={onToggle} todos={todos} />
        )}
      </div>
    </main>
  );
};
