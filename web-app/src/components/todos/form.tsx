import { CreateTodoDTO } from "@common/types";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import classNames from "classnames";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

export type TodoFormValues = CreateTodoDTO;

export class TodoFormSchema implements TodoFormValues {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;
}

type Props = {
  form: UseFormReturn<TodoFormValues>;
  loading?: boolean;
};

export const TodoForm: FC<Props> = ({ form, loading }) => {
  const { register, formState } = form;

  return (
    <>
      <div
        className={"flex items-center gap-2 border-b border-b-neutral-300 p-4"}
      >
        <div className={"w-full"}>
          <input
            {...register("title")}
            className={classNames(
              "w-full rounded-lg border-2 border-dashed border-neutral-300 text-2xl disabled:cursor-not-allowed disabled:bg-neutral-300 focus:ring-0",
              {
                "border-red-600 focus:border-red-600": formState.errors.title,
              },
            )}
            data-testid={"todo-form-title"}
            disabled={loading}
            placeholder={"Title"}
          />
          {formState.errors.title && (
            <p
              className={"mt-1 text-red-600"}
              data-testid={"todo-form-title-error"}
            >
              {formState.errors.title.message}
            </p>
          )}
        </div>
      </div>
      <div className={"border-b border-b-neutral-300 p-4"}>
        <div className={"w-full"}>
          <textarea
            {...register("description")}
            className={classNames(
              "w-full rounded-lg border-2 border-dashed border-neutral-300 disabled:cursor-not-allowed disabled:bg-neutral-300 focus:ring-0",
              {
                "border-red-600 focus:border-red-600":
                  formState.errors.description,
              },
            )}
            data-testid={"todo-form-description"}
            disabled={loading}
            placeholder={"Description"}
          />
          {formState.errors.description && (
            <p
              className={"mt-1 text-red-600"}
              data-testid={"todo-form-description-error"}
            >
              {formState.errors.description.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
