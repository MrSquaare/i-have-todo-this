import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { renderWithProviders } from "../../tests/utilities";

import { CollapsibleTodoList } from "./collapsible-list";
import { todosFixture } from "./tests/fixtures/todos";

describe("CollapsibleTodoList", () => {
  it("should render", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();

    const { baseElement } = renderWithProviders(
      <CollapsibleTodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        todos={[]}
        trigger={"trigger"}
      />,
    );

    expect(baseElement).toBeTruthy();
  });

  it("should render a trigger", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();
    const trigger = <div data-testid={"test-trigger"}>Trigger</div>;

    renderWithProviders(
      <CollapsibleTodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        todos={[]}
        trigger={trigger}
      />,
    );

    expect(screen.getByTestId("test-trigger")).toBeInTheDocument();
  });

  it("should not render todo list by default", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();

    renderWithProviders(
      <CollapsibleTodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        todos={todosFixture}
        trigger={"trigger"}
      />,
    );

    expect(screen.queryByTestId("todo-list")).not.toBeInTheDocument();
  });

  it("should render todo list when open", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();

    renderWithProviders(
      <CollapsibleTodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        open={true}
        todos={todosFixture}
        trigger={"trigger"}
      />,
    );

    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  });

  it("should not render todo list when closed", () => {
    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();

    renderWithProviders(
      <CollapsibleTodoList
        onDetailsClick={onDetailsClick}
        onToggle={onToggle}
        open={false}
        todos={todosFixture}
        trigger={"trigger"}
      />,
    );

    expect(screen.queryByTestId("todo-list")).not.toBeInTheDocument();
  });

  it("should call onOpenChange when open", async () => {
    const user = userEvent.setup();

    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();
    const onOpenChange = jest.fn();

    renderWithProviders(
      <CollapsibleTodoList
        onDetailsClick={onDetailsClick}
        onOpenChange={onOpenChange}
        onToggle={onToggle}
        open={false}
        todos={todosFixture}
        trigger={"trigger"}
      />,
    );

    const trigger = screen.getByTestId("collapsible-todo-list-trigger");

    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("should call onOpenChange when closed", async () => {
    const user = userEvent.setup();

    const onToggle = jest.fn();
    const onDetailsClick = jest.fn();
    const onOpenChange = jest.fn();

    renderWithProviders(
      <CollapsibleTodoList
        onDetailsClick={onDetailsClick}
        onOpenChange={onOpenChange}
        onToggle={onToggle}
        open={true}
        todos={todosFixture}
        trigger={"trigger"}
      />,
    );

    const trigger = screen.getByTestId("collapsible-todo-list-trigger");

    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
