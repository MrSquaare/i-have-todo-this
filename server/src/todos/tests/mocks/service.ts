import { TodoDTO } from "@common/types";

export const getMockedTodosService = (todosFixture: TodoDTO[]) => {
  return jest.fn(() => ({
    findAll: jest.fn(() => todosFixture),
  }))();
};

export type MockedTodosService = ReturnType<typeof getMockedTodosService>;
