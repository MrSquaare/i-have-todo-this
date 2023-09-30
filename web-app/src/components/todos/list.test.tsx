import { render, screen } from "@testing-library/react";

import { TodoList } from "./list";
import { todosFixture } from "./tests/fixtures/todos";

describe("TodoList", () => {
  it("should render", () => {
    render(<TodoList todos={[]} />);

    expect(true).toBe(true);
  });

  it("should render todo items", () => {
    render(<TodoList todos={todosFixture} />);

    const todoTitles = screen.getAllByTestId("todo-label");

    expect(todoTitles).toHaveLength(todosFixture.length);
    expect(todoTitles[0]).toHaveTextContent(todosFixture[0].title);
    expect(todoTitles[1]).toHaveTextContent(todosFixture[1].title);
  });
});
