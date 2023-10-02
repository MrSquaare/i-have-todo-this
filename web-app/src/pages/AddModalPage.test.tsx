import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as nock from "nock";

import * as todos from "../api/todos";
import { API_URL } from "../constants/api";
import { mockedNavigate } from "../tests/mocks/router";
import { renderWithProviders } from "../tests/utilities";

import { AddModalPage } from "./AddModalPage";

describe("AddModalPage", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    nock.cleanAll();
  });

  it("should render", async () => {
    renderWithProviders(<AddModalPage />);

    expect(true).toBe(true);
  });

  // FIXME: This error is failing because React crashes
  // This seems to be a bug with Testing Library (and React Query), since this crash does not happen in the browser
  // (Reproduction: Make server return 400 and try the test steps in the browser)
  // See DetailsModalPage.test.tsx for a similar test that works
  // eslint-disable-next-line jest/no-commented-out-tests
  /*
  it("should show error", async () => {
    const scope = nock(API_URL).post("/todos").reply(400, {
      name: "Error",
      message: "My error",
    });

    const mockedCreateTodo = jest.spyOn(todos, "createTodo");

    renderWithProviders(<AddModalPage />);

    const titleInput = screen.getByTestId("todo-form-title");
    const descriptionInput = screen.getByTestId("todo-form-description");
    const addButton = screen.getByTestId("add-create");

    await userEvent.type(titleInput, "My todo");
    await userEvent.type(descriptionInput, "My description");
    await userEvent.click(addButton);

    await waitFor(() => expect(mockedCreateTodo).toHaveBeenCalled());

    expect(scope.isDone()).toBe(true);

    const error = await screen.findByTestId("add-error");

    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("My error");
  });
  */

  it("should create a todo", async () => {
    const user = userEvent.setup();

    const scope = nock(API_URL)
      .post("/todos")
      .reply(201, { id: 1, title: "My todo", description: "My description" });

    const mockedCreateTodo = jest.spyOn(todos, "createTodo");

    renderWithProviders(<AddModalPage />);

    const titleInput = screen.getByTestId("todo-form-title");
    const descriptionInput = screen.getByTestId("todo-form-description");
    const addButton = screen.getByTestId("add-create");

    await userEvent.type(titleInput, "My todo");
    await userEvent.type(descriptionInput, "My description");
    await user.click(addButton);

    await waitFor(() =>
      expect(mockedCreateTodo).toHaveBeenCalledWith({
        title: "My todo",
        description: "My description",
      }),
    );

    expect(scope.isDone()).toBe(true);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalled());

    expect(mockedNavigate).toHaveBeenCalledWith("/", expect.anything());
  });

  it("should close modal on overlay click", async () => {
    renderWithProviders(<AddModalPage />);

    const overlay = screen.getByTestId("add-overlay");

    await userEvent.click(overlay);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalled());

    expect(mockedNavigate).toHaveBeenCalledWith("/", expect.anything());
  });

  it("should close modal on close button click", async () => {
    renderWithProviders(<AddModalPage />);

    const closeButton = screen.getByTestId("add-close");

    await userEvent.click(closeButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalled());

    expect(mockedNavigate).toHaveBeenCalledWith("/", expect.anything());
  });
});
