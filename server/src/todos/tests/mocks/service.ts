export const getMockedTodosService = () => {
  return jest.fn(() => ({
    findAll: jest.fn(),
    toggle: jest.fn(),
  }))();
};

export type MockedTodosService = ReturnType<typeof getMockedTodosService>;
