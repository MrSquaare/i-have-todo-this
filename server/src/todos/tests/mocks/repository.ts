export const getMockedTodosRepository = () => {
  return jest.fn(() => ({
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  }))();
};

export type MockedTodosRepository = ReturnType<typeof getMockedTodosRepository>;
