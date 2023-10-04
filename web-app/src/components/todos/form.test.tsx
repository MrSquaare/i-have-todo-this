import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { renderHook, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useForm } from "react-hook-form";

import { renderWithProviders } from "../../tests/utilities";

import { TodoForm, TodoFormSchema, TodoFormValues } from "./form";

describe("TodoForm", () => {
  it("should render", () => {
    const { result } = renderHook(() => useForm<TodoFormValues>());

    renderWithProviders(<TodoForm form={result.current} />);

    expect(true).toBe(true);
  });

  it("should have default values", () => {
    const { result } = renderHook(() =>
      useForm<TodoFormValues>({
        defaultValues: {
          description: "description",
          title: "title",
        },
      }),
    );

    renderWithProviders(<TodoForm form={result.current} />);

    const titleInput = screen.getByTestId("todo-form-title");
    const descriptionInput = screen.getByTestId("todo-form-description");

    expect(titleInput).toHaveValue("title");
    expect(descriptionInput).toHaveValue("description");
  });

  it("should update values", async () => {
    const user = userEvent.setup();

    const { result } = renderHook(() => useForm<TodoFormValues>());

    renderWithProviders(<TodoForm form={result.current} />);

    const titleInput = screen.getByTestId("todo-form-title");
    const descriptionInput = screen.getByTestId("todo-form-description");

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");

    await user.type(titleInput, "My title");
    await user.type(descriptionInput, "My description");

    expect(titleInput).toHaveValue("My title");
    expect(descriptionInput).toHaveValue("My description");
    expect(result.current.getValues()).toEqual({
      title: "My title",
      description: "My description",
    });
  });

  it("should show errors", async () => {
    const { result, rerender: rerenderHook } = renderHook(() =>
      useForm<TodoFormValues>(),
    );

    const { rerender } = renderWithProviders(
      <TodoForm form={result.current} />,
    );

    const titleInput = screen.getByTestId("todo-form-title");
    const descriptionInput = screen.getByTestId("todo-form-description");

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");

    result.current.setError("title", {
      type: "isNotEmpty",
      message: "title should not be empty",
    });
    result.current.setError("description", {
      type: "isString",
      message: "description should be a string",
    });

    rerenderHook();
    rerender(<TodoForm form={result.current} />);

    const titleError = screen.getByTestId("todo-form-title-error");
    const descriptionError = screen.getByTestId("todo-form-description-error");

    expect(titleError).toBeInTheDocument();
    expect(titleError).toHaveTextContent("title should not be empty");
    expect(descriptionError).toBeInTheDocument();
    expect(descriptionError).toHaveTextContent(
      "description should be a string",
    );
  });

  it("should show errors with resolver", async () => {
    const onSubmit = jest.fn();

    const { result } = renderHook(() =>
      useForm<TodoFormValues>({
        resolver: classValidatorResolver(TodoFormSchema),
      }),
    );

    const { rerender } = renderWithProviders(
      <TodoForm form={result.current} />,
    );

    const titleInput = screen.getByTestId("todo-form-title");
    const descriptionInput = screen.getByTestId("todo-form-description");

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");

    await waitFor(() => result.current.handleSubmit(onSubmit)());

    expect(onSubmit).not.toHaveBeenCalled();
    expect(result.current.formState.errors.title?.type).toBe("isNotEmpty");

    rerender(<TodoForm form={result.current} />);

    const titleError = screen.getByTestId("todo-form-title-error");

    expect(titleError).toBeInTheDocument();
  });
});
