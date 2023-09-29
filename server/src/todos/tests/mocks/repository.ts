import { TodoDTO } from "@common/types";

export const getMockedTodosRepository = (todosFixture: TodoDTO[]) => {
  return jest.fn(() => ({
    find: jest.fn(() => todosFixture),
  }))();
};

export type MockedTodosRepository = ReturnType<typeof getMockedTodosRepository>;
