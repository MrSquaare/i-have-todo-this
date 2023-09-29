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
    mockedTodosRepository = getMockedTodosRepository(todosFixture);

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

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all todos", () => {
    const got = service.findAll();
    const expected = todosFixture;

    expect(got).toEqual(expected);
    expect(mockedTodosRepository.find).toHaveBeenCalledTimes(1);
  });
});
