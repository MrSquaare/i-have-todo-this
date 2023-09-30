import { TodoState } from "@common/types";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { NotFoundError } from "../common/errors/not-found";

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

  describe("findOne", () => {
    it("should throw error if todo not found", async () => {
      mockedTodosService.findOne.mockRejectedValue(
        new NotFoundError(`Todo with id 1 not found`),
      );

      const got = controller.findOne("1");

      await expect(got).rejects.toBeInstanceOf(NotFoundException);

      expect(mockedTodosService.findOne).toHaveBeenCalled();
    });

    it("should rethrow error if unhandled error", async () => {
      const error = new Error(`Something went wrong`);

      mockedTodosService.findOne.mockRejectedValue(error);

      const got = controller.findOne("1");

      await expect(got).rejects.toBe(error);

      expect(mockedTodosService.findOne).toHaveBeenCalled();
    });

    it("should return fixture todo", async () => {
      const todo = todosFixture[0];

      mockedTodosService.findOne.mockResolvedValue(todo);

      const got = await controller.findOne(todo.id);

      expect(got).toEqual(todo);
      expect(mockedTodosService.findOne).toHaveBeenCalled();
    });
  });

  describe("toggle", () => {
    it("should throw error if todo not found", async () => {
      mockedTodosService.toggle.mockRejectedValue(
        new NotFoundError(`Todo with id 1 not found`),
      );

      const got = controller.toggle("1");

      await expect(got).rejects.toBeInstanceOf(NotFoundException);

      expect(mockedTodosService.toggle).toHaveBeenCalled();
    });

    it("should rethrow error if unhandled error", async () => {
      const error = new Error(`Something went wrong`);

      mockedTodosService.toggle.mockRejectedValue(error);

      const got = controller.toggle("1");

      await expect(got).rejects.toBe(error);

      expect(mockedTodosService.toggle).toHaveBeenCalled();
    });

    it("should turn todo to done", async () => {
      const todo = todosFixture[0];
      const expected = {
        ...todo,
        state: TodoState.DONE,
      };

      mockedTodosService.toggle.mockResolvedValue(expected);

      const got = await controller.toggle(todo.id);

      expect(got).toEqual(expected);
      expect(mockedTodosService.toggle).toHaveBeenCalled();
    });

    it("should turn done to todo", async () => {
      const todo = todosFixture[1];
      const expected = {
        ...todo,
        state: TodoState.TODO,
      };

      mockedTodosService.toggle.mockResolvedValue(expected);

      const got = await controller.toggle(todo.id);

      expect(got).toEqual(expected);
      expect(mockedTodosService.toggle).toHaveBeenCalled();
    });
  });
});
