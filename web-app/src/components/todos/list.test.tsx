import { render, screen } from "@testing-library/react";

import { TodoList } from "./list";
import { todosFixture } from "./tests/fixtures/todos";

describe("TodoList", () => {
  it("should render", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();

    render(
      <TodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        todos={[]}
      />,
    );

    expect(true).toBe(true);
  });

  it("should render todo items", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();

    render(
      <TodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        todos={todosFixture}
      />,
    );

    const todoTitles = screen.getAllByTestId("todo-label");

    expect(todoTitles).toHaveLength(todosFixture.length);
    expect(todoTitles[0]).toHaveTextContent(todosFixture[0].title);
    expect(todoTitles[1]).toHaveTextContent(todosFixture[1].title);
  });

  it("should be checked depending on todo state", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();

    render(
      <TodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        todos={todosFixture}
      />,
    );

    const todoCheckboxes = screen.getAllByTestId("todo-checkbox");

    expect(todoCheckboxes[0]).not.toBeChecked();
    expect(todoCheckboxes[1]).toBeChecked();
  });

  it("should call onToggle when a todo is toggled", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();

    render(
      <TodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        todos={todosFixture}
      />,
    );

    const todoCheckboxes = screen.getAllByTestId("todo-checkbox");

    todoCheckboxes[0].click();
    todoCheckboxes[1].click();

    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(todosFixture[0]);
    expect(onToggle).toHaveBeenCalledWith(todosFixture[1]);
  });

  it("should call onDetailsClick when a todo details button is clicked", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();

    render(
      <TodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        todos={todosFixture}
      />,
    );

    const todoDetailsButtons = screen.getAllByTestId("todo-details");

    todoDetailsButtons[0].click();
    todoDetailsButtons[1].click();

    expect(onDetailsClick).toHaveBeenCalledTimes(2);
    expect(onDetailsClick).toHaveBeenCalledWith(todosFixture[0]);
    expect(onDetailsClick).toHaveBeenCalledWith(todosFixture[1]);
  });
});
