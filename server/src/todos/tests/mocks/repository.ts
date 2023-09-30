export const getMockedTodosRepository = () => {
  return jest.fn(() => ({
    find: jest.fn(),
  }))();
};

export type MockedTodosRepository = ReturnType<typeof getMockedTodosRepository>;
