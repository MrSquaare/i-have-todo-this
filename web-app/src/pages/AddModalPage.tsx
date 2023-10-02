import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { createTodo } from "../api/todos";
import {
  TodoForm,
  TodoFormSchema,
  TodoFormValues,
} from "../components/todos/form";
import { useError } from "../hooks/useError";

export const AddModalPage: FC = () => {
  const navigate = useNavigate();

  const form = useForm<TodoFormValues>({
    resolver: classValidatorResolver(TodoFormSchema),
  });

  const queryClient = useQueryClient();

  const onClose = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  const { mutate: toggleTodoMutate, error: createTodoError } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      onClose();
    },
  });

  const onCreate = useCallback(
    (values: TodoFormValues) => {
      toggleTodoMutate(values);
    },
    [toggleTodoMutate],
  );

  const { globalError } = useError(createTodoError);

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
          data-testid={"add-overlay"}
        />
        <Dialog.Content
          className={
            "fixed left-[50%] top-[50%] w-full max-w-[60rem] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white focus:outline-none data-[state=open]:animate-contentShow"
          }
        >
          {globalError ? (
            <div className={"p-8"}>
              <div
                className={
                  "flex items-center rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800"
                }
                role={"alert"}
              >
                <p className={"font-medium"} data-testid={"add-error"}>
                  {globalError}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onCreate)}>
              <TodoForm form={form} />
              <div className={"flex justify-end gap-2 p-4"}>
                <button
                  className={
                    "rounded-full bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none"
                  }
                  data-testid={"add-create"}
                  type={"submit"}
                >
                  Create
                </button>
                <button
                  className={
                    "rounded-full bg-neutral-200 px-4 py-2 hover:bg-neutral-300"
                  }
                  data-testid={"add-close"}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
