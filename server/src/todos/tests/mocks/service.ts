export const getMockedTodosService = () => {
  return jest.fn(() => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    toggle: jest.fn(),
  }))();
};

export type MockedTodosService = ReturnType<typeof getMockedTodosService>;
