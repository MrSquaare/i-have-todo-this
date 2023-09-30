import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from "@nestjs/common";

import { NotFoundError } from "../common/errors/not-found";

import { Todo } from "./entities/todo.entity";
import { TodosService } from "./todos.service";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return this.todosService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: Todo["id"]) {
    try {
      return await this.todosService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Patch(":id/toggle")
  async toggle(@Param("id") id: Todo["id"]) {
    try {
      return await this.todosService.toggle(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
