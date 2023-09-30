import { TodoState } from "@common/types";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as nock from "nock";

import * as todos from "./api/todos";
import { App } from "./App";
import { todosFixture } from "./components/todos/tests/fixtures/todos";
import { API_URL } from "./constants/api";
import { renderWithProviders } from "./tests/utilities";

describe("App", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    nock.cleanAll();
  });

  it("should render", async () => {
    renderWithProviders(<App />);

    expect(true).toBe(true);
  });

  it("should show loading", async () => {
    nock(API_URL).get("/todos").delay(1000).reply(200, []);

    const mockedFetchTodos = jest.spyOn(todos, "fetchTodos");

    renderWithProviders(<App />);

    await waitFor(() => expect(mockedFetchTodos).toHaveBeenCalled());

    const spinner = await screen.findByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("should show empty", async () => {
    const scope = nock(API_URL).get("/todos").reply(200, []);

    const mockedFetchTodos = jest.spyOn(todos, "fetchTodos");

    renderWithProviders(<App />);

    await waitFor(() => expect(mockedFetchTodos).toHaveBeenCalled());

    expect(scope.isDone()).toBe(true);

    const empty = await screen.findByTestId("empty");

    expect(empty).toBeInTheDocument();
  });

  it("should show todos", async () => {
    const scope = nock(API_URL).get("/todos").reply(200, todosFixture);

    const mockedFetchTodos = jest.spyOn(todos, "fetchTodos");

    renderWithProviders(<App />);

    await waitFor(() => expect(mockedFetchTodos).toHaveBeenCalled());

    expect(scope.isDone()).toBe(true);

    const todoLabels = await screen.findAllByTestId("todo-label");

    expect(todoLabels).toHaveLength(todosFixture.length);
    expect(todoLabels[0]).toHaveTextContent(todosFixture[0].title);
    expect(todoLabels[1]).toHaveTextContent(todosFixture[1].title);
  });

  it("should show error", async () => {
    const scope = nock(API_URL).get("/todos").reply(400, {
      name: "Error",
      message: "My error",
    });

    const mockedFetchTodos = jest.spyOn(todos, "fetchTodos");

    renderWithProviders(<App />);

    await waitFor(() => expect(mockedFetchTodos).toHaveBeenCalled());

    expect(scope.isDone()).toBe(true);

    const error = await screen.findByTestId("error");

    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("My error");
  });

  it("should toggle todo", async () => {
    const user = userEvent.setup();

    const listScope = nock(API_URL).get("/todos").reply(200, todosFixture);
    const toggleScope = nock(API_URL)
      .patch(`/todos/${todosFixture[0].id}/toggle`)
      .reply(200, {
        ...todosFixture[0],
        state: TodoState.DONE,
      });

    const mockedFetchTodos = jest
      .spyOn(todos, "fetchTodos")
      .mockName("fetchTodos");
    const mockedToggleTodo = jest
      .spyOn(todos, "toggleTodo")
      .mockName("toggleTodo");

    renderWithProviders(<App />);

    await waitFor(() => expect(mockedFetchTodos).toHaveBeenCalled());

    expect(listScope.isDone()).toBe(true);

    const todoCheckboxes = await screen.findAllByTestId("todo-checkbox");

    expect(todoCheckboxes[0]).not.toBeChecked();

    listScope.get("/todos").reply(200, [
      {
        ...todosFixture[0],
        state: TodoState.DONE,
      },
      todosFixture[1],
    ]);
    mockedFetchTodos.mockClear();

    await user.click(todoCheckboxes[0]);

    await waitFor(() => expect(mockedToggleTodo).toHaveBeenCalled());

    expect(toggleScope.isDone()).toBe(true);

    await waitFor(() => expect(mockedFetchTodos).toHaveBeenCalled());

    expect(listScope.isDone()).toBe(true);

    await waitFor(() => expect(todoCheckboxes[0]).toBeChecked());
  });
});
