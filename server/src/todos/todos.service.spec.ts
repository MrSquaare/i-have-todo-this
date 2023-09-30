import { TodoState } from "@common/types";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { NotFoundError } from "../common/errors/not-found";

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

  describe("toggle", () => {
    it("should throw error if todo not found", async () => {
      mockedTodosRepository.findOne.mockResolvedValue(null);

      await expect(service.toggle("1")).rejects.toBeInstanceOf(NotFoundError);

      expect(mockedTodosRepository.findOne).toHaveBeenCalled();
      expect(mockedTodosRepository.findOne).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    it("should turn todo to done", async () => {
      const todo = todosFixture[0];
      const expected = {
        ...todo,
        state: TodoState.DONE,
      };

      mockedTodosRepository.findOne.mockResolvedValue(todo);
      mockedTodosRepository.save.mockResolvedValue(expected);

      const got = await service.toggle(todo.id);

      expect(got).toEqual(expected);
      expect(mockedTodosRepository.findOne).toHaveBeenCalled();
      expect(mockedTodosRepository.findOne).toHaveBeenCalledWith({
        where: { id: todo.id },
      });
      expect(mockedTodosRepository.save).toHaveBeenCalled();
      expect(mockedTodosRepository.save).toHaveBeenCalledWith(expected);
    });

    it("should turn done to todo", async () => {
      const todo = todosFixture[1];
      const expected = {
        ...todo,
        state: TodoState.TODO,
      };

      mockedTodosRepository.findOne.mockResolvedValue(todo);
      mockedTodosRepository.save.mockResolvedValue(expected);

      const got = await service.toggle(todo.id);

      expect(got).toEqual(expected);
      expect(mockedTodosRepository.findOne).toHaveBeenCalled();
      expect(mockedTodosRepository.findOne).toHaveBeenCalledWith({
        where: { id: todo.id },
      });
      expect(mockedTodosRepository.save).toHaveBeenCalled();
      expect(mockedTodosRepository.save).toHaveBeenCalledWith(expected);
    });
  });
});
