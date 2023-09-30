import { TodoState } from "@common/types";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as nock from "nock";

import * as todos from "../api/todos";
import { todosFixture } from "../components/todos/tests/fixtures/todos";
import { API_URL } from "../constants/api";
import { mockedNavigate, mockedUseParams } from "../tests/mocks/router";
import { renderWithProviders } from "../tests/utilities";

import { DetailsModalPage } from "./DetailsModalPage";

describe("DetailsModalPage", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    nock.cleanAll();
  });

  it("should render", async () => {
    renderWithProviders(<DetailsModalPage />);

    expect(true).toBe(true);
  });

  it("should show loading", async () => {
    renderWithProviders(<DetailsModalPage />);

    const spinner = screen.getByTestId("details-spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("should redirect to home when todo is not found", async () => {
    const scope = nock(API_URL).get("/todos/1").reply(404);

    mockedUseParams.mockReturnValue({ id: "1" });

    renderWithProviders(<DetailsModalPage />);

    await waitFor(() => expect(mockedUseParams).toHaveBeenCalled());

    expect(scope.isDone()).toBe(true);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalled());

    expect(mockedNavigate).toHaveBeenCalledWith("/", expect.anything());
  });

  it("should show error", async () => {
    const scope = nock(API_URL).get("/todos/1").reply(400, {
      name: "Error",
      message: "My error",
    });

    mockedUseParams.mockReturnValue({ id: "1" });

    renderWithProviders(<DetailsModalPage />);

    await waitFor(() => expect(mockedUseParams).toHaveBeenCalled());

    expect(scope.isDone()).toBe(true);

    const error = await screen.findByTestId("details-error");

    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("My error");
  });

  it("should show todo", async () => {
    const todo = todosFixture[0];

    const scope = nock(API_URL).get(`/todos/${todo.id}`).reply(200, todo);

    const mockedFetchTodo = jest.spyOn(todos, "fetchTodo");

    mockedUseParams.mockReturnValue({ id: todo.id });

    renderWithProviders(<DetailsModalPage />);

    await waitFor(() => expect(mockedUseParams).toHaveBeenCalled());
    await waitFor(() => expect(mockedFetchTodo).toHaveBeenCalled());

    expect(scope.isDone()).toBe(true);

    const todoState = await screen.findByTestId("details-todo-state");
    const todoTitle = await screen.findByTestId("details-todo-title");
    const todoDescription = await screen.findByTestId(
      "details-todo-description",
    );

    expect(todoState).toHaveTextContent("To do");
    expect(todoTitle).toHaveTextContent(todo.title);
    expect(todoDescription).toHaveTextContent(todo.description ?? "");
  });

  it("should toggle todo", async () => {
    const user = userEvent.setup();

    const todo = todosFixture[0];

    const getScope = nock(API_URL).get(`/todos/${todo.id}`).reply(200, todo);
    const toggleScope = nock(API_URL)
      .patch(`/todos/${todosFixture[0].id}/toggle`)
      .reply(200, {
        ...todosFixture[0],
        state: TodoState.DONE,
      });

    const mockedFetchTodo = jest.spyOn(todos, "fetchTodo");
    const mockedToggleTodo = jest.spyOn(todos, "toggleTodo");

    mockedUseParams.mockReturnValue({ id: todo.id });

    renderWithProviders(<DetailsModalPage />);

    await waitFor(() => expect(mockedUseParams).toHaveBeenCalled());
    await waitFor(() => expect(mockedFetchTodo).toHaveBeenCalled());

    expect(getScope.isDone()).toBe(true);

    const todoState = await screen.findByTestId("details-todo-state");

    expect(todoState).toHaveTextContent("To do");

    getScope.get(`/todos/${todo.id}`).reply(200, {
      ...todosFixture[0],
      state: TodoState.DONE,
    });
    mockedFetchTodo.mockClear();

    const todoToggle = await screen.findByTestId("details-todo-toggle");

    await user.click(todoToggle);

    await waitFor(() => expect(mockedToggleTodo).toHaveBeenCalled());

    expect(toggleScope.isDone()).toBe(true);

    await waitFor(() => expect(mockedFetchTodo).toHaveBeenCalled());

    expect(getScope.isDone()).toBe(true);

    await waitFor(() => expect(todoState).toHaveTextContent("Done"));
  });

  it("should close modal on overlay click", async () => {
    const todo = todosFixture[0];

    const scope = nock(API_URL).get(`/todos/${todo.id}`).reply(200, todo);

    const mockedFetchTodo = jest.spyOn(todos, "fetchTodo");

    mockedUseParams.mockReturnValue({ id: todo.id });

    renderWithProviders(<DetailsModalPage />);

    await waitFor(() => expect(mockedUseParams).toHaveBeenCalled());
    await waitFor(() => expect(mockedFetchTodo).toHaveBeenCalled());

    expect(scope.isDone()).toBe(true);

    const overlay = await screen.findByTestId("details-overlay");

    await userEvent.click(overlay);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalled());

    expect(mockedNavigate).toHaveBeenCalledWith("/", expect.anything());
  });

  it("should close modal on close button click", async () => {
    const todo = todosFixture[0];

    const scope = nock(API_URL).get(`/todos/${todo.id}`).reply(200, todo);

    const mockedFetchTodo = jest.spyOn(todos, "fetchTodo");

    mockedUseParams.mockReturnValue({ id: todo.id });

    renderWithProviders(<DetailsModalPage />);

    await waitFor(() => expect(mockedUseParams).toHaveBeenCalled());
    await waitFor(() => expect(mockedFetchTodo).toHaveBeenCalled());

    expect(scope.isDone()).toBe(true);

    const closeButton = await screen.findByTestId("details-close");

    await userEvent.click(closeButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalled());

    expect(mockedNavigate).toHaveBeenCalledWith("/", expect.anything());
  });
});
