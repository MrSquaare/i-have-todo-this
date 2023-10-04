import { TodoState } from "@common/types";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchTodo, toggleTodo } from "../api/todos";
import { Button } from "../components/ui/button";
import { Loader } from "../components/ui/loader";
import { useError } from "../hooks/useError";
import { useNotFound } from "../hooks/useNotFound";

type Params = {
  id: string;
};

export const DetailsModalPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();

  const queryClient = useQueryClient();
  const {
    data: todo,
    isLoading: todoLoading,
    error: todoError,
  } = useQuery({
    queryKey: ["todos", id],
    queryFn: id ? () => fetchTodo(id) : undefined,
  });

  const onClose = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  const {
    mutate: toggleTodoMutate,
    isLoading: toggleTodoLoading,
    error: toggleTodoError,
  } = useMutation({
    mutationFn: id ? () => toggleTodo(id) : undefined,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const onToggle = useCallback(() => {
    toggleTodoMutate();
  }, [toggleTodoMutate]);

  useNotFound(todoError, () => {
    onClose();
  });

  const { globalError } = useError(todoError ?? toggleTodoError);

  return (
    <Dialog.Root
      modal={true}
      onOpenChange={() => {
        onClose();
      }}
      open={true}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={
            "fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow"
          }
          data-testid={"details-overlay"}
        />
        <Dialog.Content
          className={
            "fixed left-[50%] top-[50%] w-full max-w-[60rem] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white focus:outline-none data-[state=open]:animate-contentShow"
          }
        >
          {globalError ? (
            <div className={"p-4"}>
              <div
                className={
                  "flex items-center rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800"
                }
                role={"alert"}
              >
                <p className={"font-medium"} data-testid={"details-error"}>
                  {globalError}
                </p>
              </div>
            </div>
          ) : null}
          {todoLoading ? (
            <div className={"flex h-32 items-center justify-center p-4"}>
              <Loader size={"2rem"} data-testid={"details-loader"} />
            </div>
          ) : todo ? (
            <>
              <div
                className={
                  "flex items-center gap-2 border-b border-b-neutral-300 p-4"
                }
              >
                <span
                  className={classNames(
                    "inline-flex items-center rounded-full px-2 py-1 font-medium border border-blue-600 text-blue-600 shrink-0",
                    {
                      "bg-white": todo.state === TodoState.TODO,
                      "bg-blue-600 text-white": todo.state === TodoState.DONE,
                    },
                  )}
                  data-testid={"details-todo-state"}
                >
                  {todo.state === TodoState.TODO ? "To do" : "Done"}
                </span>
                <h1 className={"text-2xl"} data-testid={"details-todo-title"}>
                  {todo.title}
                </h1>
              </div>
              <div className={"p-4"} data-testid={"details-todo-description"}>
                <p>{todo.description || "No description"}</p>
              </div>
            </>
          ) : null}
          <div
            className={
              "flex justify-end gap-2 border-t border-t-neutral-300 p-4"
            }
          >
            {todo ? (
              <Button
                data-testid={"details-todo-toggle"}
                loading={toggleTodoLoading}
                onClick={onToggle}
                variant={"primary"}
              >
                Toggle
              </Button>
            ) : null}
            <Button
              data-testid={"details-close"}
              onClick={onClose}
              variant={"secondary"}
            >
              Close
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
