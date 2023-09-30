import { Body, Controller, Get, NotFoundException, Post } from "@nestjs/common";

import { NotFoundError } from "../common/errors/not-found";

import { ToggleTodoDTO } from "./dtos/toggle.dto";
import { TodosService } from "./todos.service";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return this.todosService.findAll();
  }

  @Post()
  async toggle(@Body() toggleTodoDTO: ToggleTodoDTO) {
    try {
      return await this.todosService.toggle(toggleTodoDTO.id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
