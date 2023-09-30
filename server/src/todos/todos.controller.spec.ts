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
    mockedTodosService = getMockedTodosService();

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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return empty array", async () => {
      mockedTodosService.findAll.mockResolvedValue([]);

      const got = await controller.findAll();
      const expected = [];

      expect(got).toEqual(expected);
    });

    it("should return fixture todos", async () => {
      mockedTodosService.findAll.mockResolvedValue(todosFixture);

      const got = await controller.findAll();
      const expected = todosFixture;

      expect(got).toEqual(expected);
    });
  });
});
