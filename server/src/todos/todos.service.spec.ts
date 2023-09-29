import { TodoDTO, TodoState } from "@common/types";
import { Test, TestingModule } from "@nestjs/testing";

import { TodosService } from "./todos.service";

describe("TodosService", () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
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
    const got = service.findAll();
    const expected = mockTodos;

    expect(got).toEqual(expected);
  });
});
