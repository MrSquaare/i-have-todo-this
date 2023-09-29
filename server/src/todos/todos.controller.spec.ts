import { TodoDTO, TodoState } from "@common/types";
import { Test, TestingModule } from "@nestjs/testing";

import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";

describe("TodosController", () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return all todos", () => {
    const mockTodos: TodoDTO[] = [
      {
        id: "1",
        title: "Todo 1",
        state: TodoState.TODO,
      },
      {
        id: "2",
        title: "Todo 2",
        state: TodoState.DONE,
      },
    ];
    const got = controller.findAll();
    const expected = mockTodos;

    expect(got).toEqual(expected);
  });
});
