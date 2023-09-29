import { Test, TestingModule } from "@nestjs/testing";

import { todosFixture } from "./tests/fixtures/todos";
import {
  MockedTodosService,
  getMockedTodosService,
} from "./tests/mocks/service";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";

describe("TodosController", () => {
  let controller: TodosController;
  let mockedTodosService: MockedTodosService;

  beforeEach(async () => {
    mockedTodosService = getMockedTodosService(todosFixture);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockedTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return all todos", () => {
    const got = controller.findAll();
    const expected = todosFixture;

    expect(got).toEqual(expected);
  });
});
