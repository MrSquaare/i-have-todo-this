import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Todo } from "./entities/todo.entity";
import { todosFixture } from "./tests/fixtures/todos";
import {
  MockedTodosRepository,
  getMockedTodosRepository,
} from "./tests/mocks/repository";
import { TodosService } from "./todos.service";

describe("TodosService", () => {
  let service: TodosService;
  let mockedTodosRepository: MockedTodosRepository;

  beforeEach(async () => {
    mockedTodosRepository = getMockedTodosRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Todo),
          useValue: mockedTodosRepository,
        },
        TodosService,
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return empty array", async () => {
      mockedTodosRepository.find.mockResolvedValue([]);

      const got = await service.findAll();
      const expected = [];

      expect(got).toEqual(expected);
      expect(mockedTodosRepository.find).toHaveBeenCalledTimes(1);
    });

    it("should return fixture todos", async () => {
      mockedTodosRepository.find.mockResolvedValue(todosFixture);

      const got = await service.findAll();
      const expected = todosFixture;

      expect(got).toEqual(expected);
      expect(mockedTodosRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
