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
import { Button } from "../components/ui/button";
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

  const {
    mutate: createTodoMutate,
    isPending: createTodoPending,
    error: createTodoError,
  } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      onClose();
    },
  });

  const onCreate = useCallback(
    (values: TodoFormValues) => {
      createTodoMutate(values);
    },
    [createTodoMutate],
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
            <div className={"p-4"}>
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
          ) : null}
          <form onSubmit={form.handleSubmit(onCreate)}>
            <TodoForm form={form} loading={createTodoPending} />
            <div className={"flex justify-end gap-2 p-4"}>
              <Button
                data-testid={"add-create"}
                loading={createTodoPending}
                type={"submit"}
                variant={"primary"}
              >
                Create
              </Button>
              <Button
                data-testid={"add-close"}
                onClick={onClose}
                variant={"secondary"}
              >
                Close
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
