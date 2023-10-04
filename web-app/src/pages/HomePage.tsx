import { TodoDTO, TodoState } from "@common/types";
import { Plus } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { fetchTodos, toggleTodo } from "../api/todos";
import { CollapsibleTodoList } from "../components/todos/collapsible-list";
import {
  TodoList,
  TodoListOnDetailsClick,
  TodoListOnToggle,
} from "../components/todos/list";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Loader } from "../components/ui/loader";
import { useError } from "../hooks/useError";

export const HomePage: FC = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading: todosLoading,
    error: todosError,
  } = useQuery(["todos"], fetchTodos);
  const { mutate: toggleTodoMutate, error: toggleTodoError } = useMutation(
    toggleTodo,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["todos"]);
      },
    },
  );

  const [todoTodos, doneTodos] = todos?.reduce(
    (acc, todo) => {
      if (todo.state === TodoState.TODO) {
        acc[0].push(todo);
      } else {
        acc[1].push(todo);
      }

      return acc;
    },
    [[], []] as [TodoDTO[], TodoDTO[]],
  ) ?? [[], []];

  const [showDoneTodos, setShowDoneTodos] = useState(false);

  const { globalError } = useError(todosError ?? toggleTodoError);

  const onToggle = useCallback<TodoListOnToggle>(
    (todo) => {
      toggleTodoMutate(todo.id);
    },
    [toggleTodoMutate],
  );

  const onDetailsClick = useCallback<TodoListOnDetailsClick>(
    (todo) => {
      navigate(`/${todo.id}`);
    },
    [navigate],
  );

  const onAdd = useCallback(() => {
    navigate("/add");
  }, [navigate]);

  return (
    <>
      <Outlet />
      <main className={"min-h-screen"}>
        <div className={"mx-auto w-full max-w-6xl p-8"}>
          <div className={"flex items-center justify-center gap-4 py-16"}>
            <img alt={"IHTT"} className={"h-16 w-16"} src={"/logo.png"} />
            <h1 className={"text-center text-6xl font-bold"}>IHTT</h1>
          </div>
          {globalError ? (
            <div
              className={
                "mb-4 flex items-center rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800"
              }
              role={"alert"}
            >
              <p className={"font-medium"} data-testid={"home-error"}>
                {globalError}
              </p>
            </div>
          ) : null}{" "}
          {todosLoading ? (
            <div className={"flex items-center justify-center"}>
              <Loader data-testid={"home-loader"} size={"4rem"} />
            </div>
          ) : todos ? (
            <>
              <div className={"mb-4"}>
                <h2 className={"mb-2 text-2xl font-medium"}>
                  Todo <Badge>{todoTodos.length}</Badge>
                </h2>
                {!todoTodos.length ? (
                  <p
                    className={"text-center text-gray-500"}
                    data-testid={"home-empty"}
                  >
                    Nothing todo
                  </p>
                ) : (
                  <TodoList
                    onDetailsClick={onDetailsClick}
                    onToggle={onToggle}
                    todos={todoTodos}
                  />
                )}
              </div>
              {doneTodos.length ? (
                <div>
                  <CollapsibleTodoList
                    onDetailsClick={onDetailsClick}
                    onOpenChange={setShowDoneTodos}
                    onToggle={onToggle}
                    open={showDoneTodos}
                    rootProps={{
                      "data-testid": "home-done-root",
                    }}
                    todos={doneTodos}
                    trigger={
                      <h2 className={"text-2xl font-medium"}>
                        Done <Badge>{doneTodos.length}</Badge>
                      </h2>
                    }
                    triggerProps={{
                      "data-testid": "home-done-trigger",
                    }}
                  />
                </div>
              ) : null}
            </>
          ) : null}
          <div
            className={
              "fixed bottom-4 left-[50%] mt-4 flex translate-x-[-50%] justify-center"
            }
          >
            <Button
              className={"flex items-center border-2 border-white"}
              data-testid={"home-add"}
              onClick={onAdd}
              size={"lg"}
              variant={"primary"}
            >
              <Plus className={"mr-2"} weight={"bold"} />
              Add
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};
