import { render, screen } from "@testing-library/react";

import { TodoList } from "./list";
import { todosFixture } from "./tests/fixtures/todos";

describe("TodoList", () => {
  it("should render", () => {
    const onToggle = jest.fn();

    render(<TodoList onToggle={onToggle} todos={[]} />);

    expect(true).toBe(true);
  });

  it("should render todo items", () => {
    const onToggle = jest.fn();

    render(<TodoList onToggle={onToggle} todos={todosFixture} />);

    const todoTitles = screen.getAllByTestId("todo-label");

    expect(todoTitles).toHaveLength(todosFixture.length);
    expect(todoTitles[0]).toHaveTextContent(todosFixture[0].title);
    expect(todoTitles[1]).toHaveTextContent(todosFixture[1].title);
  });

  it("should call onToggle when a todo is toggled", () => {
    const onToggle = jest.fn();

    render(<TodoList onToggle={onToggle} todos={todosFixture} />);

    const todoCheckboxes = screen.getAllByTestId("todo-checkbox");

    todoCheckboxes[0].click();
    todoCheckboxes[1].click();

    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(todosFixture[0]);
    expect(onToggle).toHaveBeenCalledWith(todosFixture[1]);
  });
});
