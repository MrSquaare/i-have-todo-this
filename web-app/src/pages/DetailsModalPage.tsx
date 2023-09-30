import { TodoState } from "@common/types";
import { DotsThree } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchTodo, toggleTodo } from "../api/todos";
import { useNotFound } from "../hooks/useNotFound";

type Params = {
  id: string;
};

export const DetailsModalPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();

  const queryClient = useQueryClient();
  const { data: todo, error: todoError } = useQuery({
    queryKey: ["todos", id],
    queryFn: id ? () => fetchTodo(id) : undefined,
  });
  const { mutate: toggleTodoMutate } = useMutation({
    mutationFn: id ? () => toggleTodo(id) : undefined,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const onToggle = useCallback(() => {
    toggleTodoMutate();
  }, [toggleTodoMutate]);

  const onClose = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  useNotFound(todoError, () => {
    onClose();
  });

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
            "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white focus:outline-none data-[state=open]:animate-contentShow"
          }
        >
          {!todo ? (
            <div className={"flex h-96 items-center justify-center p-8"}>
              <DotsThree
                className={"h-12 w-12 animate-bounce"}
                data-testid={"details-spinner"}
              />
            </div>
          ) : (
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
                      "bg-blue-100": todo.state === TodoState.DONE,
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
              <div
                className={"border-b border-b-neutral-300 p-4"}
                data-testid={"details-todo-description"}
              >
                <p>{todo.description}</p>
              </div>
              <div className={"flex justify-end gap-2 p-4"}>
                <button
                  className={
                    "rounded-full bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none"
                  }
                  data-testid={"details-todo-toggle"}
                  onClick={onToggle}
                >
                  Toggle
                </button>
                <button
                  className={
                    "rounded-full bg-neutral-200 px-4 py-2 hover:bg-neutral-300"
                  }
                  data-testid={"details-close"}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
